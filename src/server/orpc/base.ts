// Adds `.effect()` to the builder. Must run during initialization.
import "@orpc/experimental-effect/extensions/effect";
import type { WithEffectContext } from "@orpc/experimental-effect";
import { os } from "@orpc/server";

import type { AppServices } from "../effect";

export interface ORPCContext extends WithEffectContext<AppServices> {
  headers: Headers;
}

export const base = os.$context<ORPCContext>();
