import {
  createCsrfMiddleware,
  createMiddleware,
  createStart,
} from "@tanstack/react-start";

// Server-only code is loaded with a dynamic import inside `.server()`, which
// TanStack Start strips from the client bundle (the module depends on
// `cloudflare:workers`).
const evlogMiddleware = createMiddleware().server(async (options) => {
  const { handleRequest } = await import("./server/evlog");

  return await handleRequest(options);
});

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  // evlog goes first so its wide event wraps every other middleware.
  requestMiddleware: [evlogMiddleware, csrfMiddleware],
}));
