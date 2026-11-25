import { test, expect } from "@playwright/test";
import { loginSistema } from "./auth-helper";

test("UH16 - exportacao de relatorio gerencial PDF e CSV", async ({ page }) => {
  await loginSistema(page);

  await page.goto("/demandas");
  const protocolo = `VISAT-2026-E${String(Date.now()).slice(-4)}`;
  await page.getByRole("button", { name: "Nova Demanda" }).click();
  await page.getByRole("combobox", { name: "Órgão solicitante" }).click();
  await page.getByRole("option").first().click();
  await page.locator("#protocolo").fill(protocolo);
  await page.getByRole("combobox").nth(1).click();
  await page.getByRole("option").first().click();
  await page.getByRole("button", { name: "Salvar" }).click();
  await expect(page.getByText(protocolo, { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "Relatórios" }).click();
  await expect(page).toHaveURL(/\/relatorios/);

  const downloadPdfPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Exportar Relatório Gerencial (PDF)" }).click();
  const downloadPdf = await downloadPdfPromise;
  expect(downloadPdf.suggestedFilename()).toContain(".pdf");
  await expect(page.getByText("Relatório PDF baixado")).toBeVisible();

  const downloadCsvPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Exportar (CSV)" }).click();
  const downloadCsv = await downloadCsvPromise;
  expect(downloadCsv.suggestedFilename()).toContain(".csv");
  await expect(page.getByText("Relatório CSV baixado")).toBeVisible();

  await page.waitForTimeout(1000);
});
