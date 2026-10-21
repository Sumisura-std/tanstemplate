import { defineConfig } from "void/config";

export default defineConfig({
  worker: {
    compatibility_date: "2026-02-24",
    compatibility_flags: [
      // Required by evlog (AsyncLocalStorage) and Effect.
      "nodejs_compat",
      // Lets oRPC cancel procedures when the client disconnects.
      "enable_request_signal",
      // Needed because compatibility_date is before 2026-03-03.
      "unhandled_rejection_after_microtask_checkpoint",
    ],
  },
  cloudflare: {
    // evlog already emits one wide event per request.
    observability: { enabled: false },
  },
});
