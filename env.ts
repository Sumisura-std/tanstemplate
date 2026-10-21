import { defineEnv, string, url } from "void/env";

export default defineEnv({
  // Base URL of the running app. Only used by the e2e runner (e2e.config.ts).
  APP_URL: url().default("http://localhost:3000"),
  BETTER_AUTH_SECRET: string(),
  BETTER_AUTH_URL: url(),
});
