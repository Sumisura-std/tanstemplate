import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { redact } from "@tanstack/redact/vite";
import viteReact from "@vitejs/plugin-react";
import { msw } from "msw/vite";
import { defineConfig } from "vite";
import { voidPlugin } from "void";

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    voidPlugin(),
    redact(),
    devtools(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    msw(),
  ],
});

export default config;
