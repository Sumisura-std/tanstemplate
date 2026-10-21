import { EvlogHandlerPlugin } from "@orpc/evlog";
import { RPCHandler } from "@orpc/server/fetch";

import { getEffectContext } from "../effect";
import { orpcEvlogOptions } from "../evlog";
import type { ORPCContext } from "./base";
import { router } from "./router";

export const RPC_PREFIX = "/api/rpc";

export const rpcHandler = new RPCHandler<ORPCContext>(router, {
  plugins: [new EvlogHandlerPlugin<ORPCContext>(orpcEvlogOptions)],
});

export const createRpcContext = async (
  request: Request
): Promise<ORPCContext> => ({
  headers: request.headers,
  "effect/context": await getEffectContext(),
});
