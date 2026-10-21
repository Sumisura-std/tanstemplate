import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createRouterClient } from "@orpc/server";
import type { RouterClient } from "@orpc/server";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { getEffectContext } from "#/server/effect";
import { router } from "#/server/orpc/router";
import type { Router } from "#/server/orpc/router";

const RPC_URL = "/api/rpc";

const getORPCClient = createIsomorphicFn()
  // During SSR, call procedures in-process: no HTTP round trip.
  .server(() =>
    createRouterClient(router, {
      // Per-request values must come from a function, because this client
      // instance is shared across requests.
      context: async () => ({
        headers: getRequestHeaders(),
        "effect/context": await getEffectContext(),
      }),
    })
  )
  .client((): RouterClient<Router> => {
    const link = new RPCLink({ url: RPC_URL });

    return createORPCClient(link);
  });

export const orpc: RouterClient<Router> = getORPCClient();
