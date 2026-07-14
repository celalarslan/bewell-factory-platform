import { defineConfig } from "@playwright/test";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

export default defineConfig({
  testDir: ".",
  testMatch: ".codex-multilingual.spec.ts",
  timeout: 120_000,
  workers: 1,
  reporter: "line",
  use: { baseURL: "http://localhost:3000", trace: "off", screenshot: "off", video: "off" },
});
