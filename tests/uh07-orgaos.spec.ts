import { test, expect } from "@playwright/test";
import { loginSistema } from "./auth-helper";

test("UH7 - cadastro de orgaos solicitantes e exibicao no dropdown", async ({ page }) => {
  await loginSistema(page);

  await page.goto("/configuracoes");
  const nomeOrgao = `Órgão Teste ${Date.now()}`;
  await page.locator("#novo-orgao").fill(nomeOrgao);
  await page.getByRole("button", { name: "Cadastrar órgão" }).click();

  await expect(page.getByText("Órgão solicitante cadastrado com sucesso")).toBeVisible({ timeout: 10000 });
  await expect(page.getByText(nomeOrgao)).toBeVisible();

  await page.goto("/demandas");
  await page.getByRole("button", { name: "Nova Demanda" }).click();
  await page.getByRole("combobox", { name: "Órgão solicitante" }).click();
  await expect(page.getByRole("option", { name: nomeOrgao })).toBeVisible();
  await page.getByRole("option", { name: nomeOrgao }).click();
  await page.waitForTimeout(1000);
});
