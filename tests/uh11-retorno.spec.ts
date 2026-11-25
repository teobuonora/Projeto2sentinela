import { test, expect } from "@playwright/test";
import { loginSistema } from "./auth-helper";

test("UH11 - registro de retorno a instituicao demandante", async ({ page }) => {
  await loginSistema(page);
  await page.goto("/demandas");

  const protocolo = `VISAT-2026-R${String(Date.now()).slice(-4)}`;
  await page.getByRole("button", { name: "Nova Demanda" }).click();
  await page.getByRole("combobox", { name: "Órgão solicitante" }).click();
  await page.getByRole("option").first().click();
  await page.locator("#protocolo").fill(protocolo);
  await page.getByRole("combobox").nth(1).click();
  await page.getByRole("option").first().click();
  await page.locator("#assunto").fill("Teste Retorno Institucional");
  await page.getByRole("button", { name: "Salvar" }).click();

  await page.getByText(protocolo, { exact: true }).click();
  await page.getByRole("button", { name: "Marcar como Respondida" }).click();

  await expect(page.getByText("Demanda marcada como Respondida")).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(1000);
});
