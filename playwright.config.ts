import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 45000,
  use: {
    baseURL: "http://localhost:8080",
    browserName: "chromium",
    video: "on",
    screenshot: "on",
    trace: "on",
  },
  webServer: {
    command: "bun run dev --host 0.0.0.0",
    url: "http://localhost:8080",
    reuseExistingServer: true,
    timeout: 60000,
  },
});
