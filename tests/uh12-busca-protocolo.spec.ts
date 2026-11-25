import { test, expect } from "@playwright/test";
import { loginSistema } from "./auth-helper";

test("UH12 - busca rapida por numero de protocolo", async ({ page }) => {
  await loginSistema(page);
  await page.goto("/demandas");

  const protocolo = `VISAT-2026-B${String(Date.now()).slice(-4)}`;
  await page.getByRole("button", { name: "Nova Demanda" }).click();
  await page.getByRole("combobox", { name: "Órgão solicitante" }).click();
  await page.getByRole("option").first().click();
  await page.locator("#protocolo").fill(protocolo);
  await page.getByRole("combobox").nth(1).click();
  await page.getByRole("option").first().click();
  await page.getByRole("button", { name: "Salvar" }).click();

  const campoBusca = page.getByLabel("Buscar demanda por número de protocolo");
  await campoBusca.fill(protocolo);

  await expect(page.getByText(`1 demanda localizada para "${protocolo}".`)).toBeVisible();
  await expect(page.getByText(protocolo, { exact: true })).toBeVisible();
  await page.waitForTimeout(1000);
});
