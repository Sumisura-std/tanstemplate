import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/rpc/$")({
  server: {
    handlers: {
      ANY: async ({ request }) => {
        // Imported lazily so server-only code (cloudflare:workers, evlog,
        // Effect runtime) never reaches the client bundle.
        const { createRpcContext, RPC_PREFIX, rpcHandler } =
          await import("#/server/orpc/handler");

        const { response } = await rpcHandler.handle(request, {
          prefix: RPC_PREFIX,
          context: async () => await createRpcContext(request),
        });

        return response ?? new Response("Not found", { status: 404 });
      },
    },
  },
});
