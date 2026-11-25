import { test, expect } from "@playwright/test";

test("tela de login deve carregar corretamente", async ({ page }) => {
  await page.goto("/auth");

  await expect(page.locator("#email")).toBeVisible();
  await expect(page.locator("#senha")).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Entrar" }),
  ).toBeVisible();
});

test("formulário de cadastro deve abrir corretamente", async ({ page }) => {
  await page.goto("/auth");
  await page.waitForTimeout(1000);

  const abaCadastro = page.getByRole("tab", { name: "Criar conta" });

  await abaCadastro.click();

  await expect(abaCadastro).toHaveAttribute("aria-selected", "true");

  await expect(page.locator("#nome")).toBeVisible();
  await expect(page.locator("#email-c")).toBeVisible();
  await expect(page.locator("#senha-c")).toBeVisible();
  await expect(page.locator("#confirmar")).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Criar conta" }),
  ).toBeVisible();
});

test("formulário de recuperação de senha deve abrir", async ({ page }) => {
  await page.goto("/auth");
  await page.waitForTimeout(1000);

  await page.getByRole("button", { name: "Esqueci a senha" }).click();

  await expect(page.locator("#email-r")).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Enviar link" }),
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Voltar" }),
  ).toBeVisible();
});