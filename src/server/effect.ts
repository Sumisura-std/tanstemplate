import * as Layer from "effect/Layer";
import * as ManagedRuntime from "effect/ManagedRuntime";
import * as Option from "effect/Option";
import * as Scheduler from "effect/Scheduler";

// Effect recommends a synchronous scheduler on Cloudflare Workers.
const SyncScheduler = Layer.succeed(
  Scheduler.Scheduler,
  new Scheduler.MixedScheduler("sync")
);

// Add your app services here, e.g. Layer.provideMerge(DatabaseLive).
const AppLayer = SyncScheduler;

const runtime = ManagedRuntime.make(AppLayer);

/** Services provided by `AppLayer`; flows into the oRPC context type. */
export type AppServices = ManagedRuntime.ManagedRuntime.Services<
  typeof runtime
>;

// Built lazily: Workers restrict async work at module scope.
let effectContext: Option.Option<ReturnType<typeof runtime.context>> =
  Option.none();

/** Effect services handed to oRPC as `context["effect/context"]`. */
export const getEffectContext = async () => {
  const context = Option.isSome(effectContext)
    ? effectContext.value
    : runtime.context();

  effectContext = Option.some(context);

  return await context;
};
