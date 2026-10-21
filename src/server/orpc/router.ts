import * as Clock from "effect/Clock";
import * as v from "valibot";

// Aliased: `useLogger` is not a React hook, but its name trips rules-of-hooks.
import { useLogger as getRequestLogger } from "../evlog";
import { base } from "./base";

const DEFAULT_NAME = "world";

const ping = base
  .input(v.object({ name: v.optional(v.string(), DEFAULT_NAME) }))
  .effect(function* ping({ input }) {
    const log = getRequestLogger();
    log.set({ ping: { name: input.name } });

    const at = yield* Clock.currentTimeMillis;

    return { message: `Hello ${input.name}!`, at };
  });

export const router = {
  ping,
};

export type Router = typeof router;
