import { expect, type Page } from "@playwright/test";
import fs from "node:fs";

export async function loginSistema(page: Page) {
  if (fs.existsSync(".env.test.local")) {
    const envContent = fs.readFileSync(".env.test.local", "utf-8");
    for (const line of envContent.split("\n")) {
      const [key, ...rest] = line.split("=");
      if (key && rest.length > 0) {
        process.env[key.trim()] = rest.join("=").trim();
      }
    }
  }

  const email = process.env.TEST_USER_EMAIL;
  const senha = process.env.TEST_USER_PASSWORD;

  if (!email || !senha) {
    throw new Error("Configure TEST_USER_EMAIL e TEST_USER_PASSWORD no arquivo .env.test.local");
  }

  await page.goto("/auth", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.locator("#email").fill(email);
  await page.locator("#senha").fill(senha);
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page).not.toHaveURL(/\/auth/, { timeout: 15000 });
}
