import gdp from "@gdp-ts/core/lint/oxlint";
import effect from "@mpsuesser/oxlint-plugin-effect";
import { defineConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import core from "ultracite/oxlint/core";
import { jsPluginSettings, selectJsPlugins } from "ultracite/oxlint/js-plugins";
import react from "ultracite/oxlint/react";
import tanstack from "ultracite/oxlint/tanstack";
import tanstackJsPlugins from "ultracite/oxlint/tanstack/js-plugins";

const jsPlugins = selectJsPlugins(["react-doctor"]);

export default defineConfig({
  env: core.env,
  extends: [
    core,
    react,
    tanstack,
    tanstackJsPlugins,
    antiSlop,
    jsPlugins,
    gdp({
      strict: true,
    }),
    effect.configs.recommended,
  ],
  ignorePatterns: [...(core.ignorePatterns ?? []), ".deepsec/**"],
  plugins: [
    "typescript",
    "unicorn",
    "oxc",
    "import",
    "promise",
    "react",
    "jsx-a11y",
    "vitest",
  ],
  categories: { correctness: "error" },
  options: { typeAware: true, typeCheck: true },
  rules: {
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    "no-inline-comments": "off",
    // @mpsuesser/oxlint-plugin-effect@0.6.0: this rule crashes every file with
    // "SchemaError: Missing key allowInTypeGuards", even with explicit options.
    // anti-slop/no-runtime-typeof already covers the same check.
    "effect/no-runtime-typeof": "off",
    // Type-aware strictness: advisory while env/typing gaps get closed.
    "typescript/no-unsafe-assignment": "warn",
    "typescript/no-unsafe-member-access": "warn",
    "typescript/strict-boolean-expressions": "warn",
    // Effect-first rules are off by default (React, evlog and config files are
    // not Effect code) and re-enabled as warnings in `overrides` below.
    "effect/no-barrel-imports": "warn",
    "effect/avoid-untagged-errors": "off",
    "effect/avoid-try-catch": "off",
    "effect/avoid-react-hooks": "off",
    "effect/avoid-process-env": "off",
    "effect/prefer-option-over-null": "off",
    "effect/prefer-effect-is": "off",
    /* Reglas fundamentales de React */
    "react/jsx-key": "error",
    "react/no-array-index-key": "error",
    "react/rules-of-hooks": "error",

    /* Buenas prácticas para TypeScript y código de servidor/cliente */
    "typescript/no-explicit-any": "error",
    "typescript/consistent-type-imports": "error",
    "typescript/consistent-type-exports": "error",
    "typescript/no-import-type-side-effects": "error",
    "unicorn/filename-case": [
      "warn",
      {
        cases: {
          camelCase: true,
          lowercase: true,
        },
        ignore: ["README\\.md", "CHANGELOG\\.md", "\\[.*\\]\\..*"],
      },
    ],
  },
  overrides: [
    {
      // `process` is typed `any` in this project and e2e.config.ts runs outside
      // Void's runtime, so `void/env` is unavailable here. APP_URL is declared in env.ts.
      files: ["e2e.config.ts"],
      rules: {
        "typescript/no-unsafe-assignment": "off",
        "typescript/no-unsafe-member-access": "off",
      },
    },
    {
      // Files that actually contain Effect code.
      files: ["src/server/effect.ts", "src/server/orpc/**"],
      rules: {
        "effect/avoid-untagged-errors": "warn",
        "effect/avoid-try-catch": "warn",
        "effect/prefer-option-over-null": "warn",
        "effect/prefer-effect-is": "warn",
        "effect/avoid-process-env": "warn",
      },
    },
  ],
  jsPlugins: jsPlugins.jsPlugins,
  settings: jsPluginSettings,
});
