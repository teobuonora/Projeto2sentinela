import { test, expect } from "@playwright/test";
import { loginSistema } from "./auth-helper";

test("UH14 - autenticacao de usuario no sistema", async ({ page }) => {
  await loginSistema(page);
  await expect(page.getByText("Secretaria Executiva de Vigilância em Saúde do Trabalhador")).toBeVisible();
  await page.waitForTimeout(1000);
});
