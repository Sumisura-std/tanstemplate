import { defineConfig } from "blume";
import { openapi } from "blume/reference";

export default defineConfig({
  title: "Docs",
  description: "Documentation powered by Blume.",
  reference: [
    openapi({
      route: "/api",
      sources: [
        {
          label: "Pet Store",
          spec: "./openapi.json",
        },
      ],
    }),
  ],
});
