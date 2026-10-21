import { waitUntil } from "cloudflare:workers";
import {
  createError,
  EvlogError,
  initLogger,
  toLoggerConfig,
  toMiddlewareOptions,
} from "evlog";
import {
  defineFrameworkIntegration,
  shouldDeferEmitForResponse,
} from "evlog/toolkit";
import type { BaseEvlogOptions } from "evlog/toolkit";
import { createLoggerStorage } from "evlog/toolkit/storage";

import config from "../../evlog.config";

interface StartRequestContext {
  pathname: string;
  request: Request;
}

interface HandleRequestArgs<TResult extends { response: Response }> {
  handlerType: "serverFn" | "router";
  next: () => Promise<TResult> | TResult;
  pathname: string;
  request: Request;
}

initLogger(toLoggerConfig(config));

const { storage, useLogger } = createLoggerStorage(
  "request context. Make sure evlogMiddleware is registered first in requestMiddleware (src/start.ts).",
  "evlog:tanstack-start"
);

/**
 * Request-scoped wide-event logger. Works in server routes, server functions,
 * oRPC procedures and any code they call, via AsyncLocalStorage (needs
 * `nodejs_compat`). `storage` is shared with `EvlogHandlerPlugin` so the same
 * `useLogger()` resolves inside oRPC requests.
 */
export { storage, useLogger };

/** oRPC owns the wide event for these paths (see `EvlogHandlerPlugin`). */
const ORPC_PATH = "/api/rpc/**";

const integration = defineFrameworkIntegration<StartRequestContext>({
  name: "tanstack-start",
  extractRequest: ({ request, pathname }) => ({
    method: request.method,
    path: pathname,
    headers: request.headers,
    requestId:
      request.headers.get("x-request-id") ??
      request.headers.get("cf-ray") ??
      undefined,
  }),
  // The logger is reached through `useLogger()`, not attached to a context object.
  // oxlint-disable-next-line no-empty-function
  attachLogger: () => {},
  storage,
  // Keep the Worker alive until drains finish after the response is returned.
  extractWaitUntil: () => waitUntil,
});

const baseOptions: BaseEvlogOptions = toMiddlewareOptions(config);

// Skip oRPC routes here so each RPC request emits a single wide event.
const middlewareOptions: BaseEvlogOptions = {
  ...baseOptions,
  exclude: [...(baseOptions.exclude ?? []), ORPC_PATH],
};

/** Options for `EvlogHandlerPlugin`: same pipeline, plus the shared storage. */
export const orpcEvlogOptions = {
  ...baseOptions,
  storage,
  waitUntil,
};

/**
 * One wide event per request (SSR, server routes and server functions).
 * Called from the global middleware in `src/start.ts`, which loads this module
 * with a dynamic import so it never reaches the client bundle.
 */
export const handleRequest = async <TResult extends { response: Response }>({
  next,
  request,
  pathname,
  handlerType,
}: HandleRequestArgs<TResult>): Promise<TResult | Response> => {
  {
    const { skipped, logger, finish, finishResponse, runWith } =
      integration.start({ pathname, request }, middlewareOptions);

    if (skipped) {
      return await next();
    }

    try {
      const result = await runWith(async () => await next());
      const { response } = result;

      if (shouldDeferEmitForResponse(response)) {
        const wrapped = await finishResponse(response, {
          status: response.status,
        });

        return { ...result, response: wrapped };
      }

      await finish({ status: response.status });

      return result;
    } catch (error) {
      // Redirects and other thrown Responses are control flow, not failures.
      if (error instanceof Response) {
        await finish({ status: error.status });
        throw error;
      }

      const failure =
        error instanceof Error
          ? error
          : createError({ message: String(error), status: 500 });

      logger.error(failure);
      await finish({ error: failure });

      // Server routes get the structured JSON body (message, why, fix, link).
      // Server functions keep rethrowing so Start serializes them as usual.
      if (handlerType === "router" && EvlogError.isEvlogError(error)) {
        return Response.json(error.toJSON(), { status: error.status });
      }

      throw error;
    }
  }
};
