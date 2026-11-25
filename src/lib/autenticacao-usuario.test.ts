import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import {
  avaliarAcessoRotaProtegida,
  sanitizarDestinoPosLogin,
  validarCredenciaisLogin,
} from "./autenticacao-usuario";

describe("UH14 — autenticação de usuário (login)", () => {
  test("bloqueia acesso sem login e preserva a rota solicitada para retorno", () => {
    const resultado = avaliarAcessoRotaProtegida(null, "/demandas?protocolo=VISAT-2026-00841");
    assert.equal(resultado.permitido, false);
    if (!resultado.permitido) {
      assert.equal(resultado.redirecionarPara, "/auth");
      assert.equal(resultado.destinoOriginal, "/demandas?protocolo=VISAT-2026-00841");
    }
  });

  test("libera acesso quando há usuário autenticado válido", () => {
    const usuario = { id: "user-visat-1", email: "inspetor@visat.recife.pe.gov.br" };
    const resultado = avaliarAcessoRotaProtegida(usuario, "/demandas");
    assert.equal(resultado.permitido, true);
    if (resultado.permitido) {
      assert.equal(resultado.usuario.id, usuario.id);
    }
  });

  test("valida credenciais de e-mail e senha antes do login", () => {
    const semEmail = validarCredenciaisLogin("invalido", "senha123");
    assert.equal(semEmail.valido, false);

    const semSenha = validarCredenciaisLogin("inspetor@visat.gov.br", "");
    assert.equal(semSenha.valido, false);

    const valido = validarCredenciaisLogin("  Inspetor@VISAT.gov.br ", "Senha@2026");
    assert.equal(valido.valido, true);
    if (valido.valido) {
      assert.equal(valido.email, "inspetor@visat.gov.br");
    }
  });

  test("impede redirecionamento externo ou loop para /auth após o login", () => {
    assert.equal(sanitizarDestinoPosLogin("https://externo.com/phishing"), "/");
    assert.equal(sanitizarDestinoPosLogin("//externo.com"), "/");
    assert.equal(sanitizarDestinoPosLogin("/auth"), "/");
    assert.equal(sanitizarDestinoPosLogin("/demandas"), "/demandas");
  });
});