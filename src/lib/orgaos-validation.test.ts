import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { normalizarNomeOrgao, validarNomeOrgao } from "./orgaos-validation";

describe("UH7 — cadastro de órgãos", () => {
  test("impede cadastros vazios, inclusive espaços", () => {
    assert.notEqual(validarNomeOrgao("", []), null);
    assert.notEqual(validarNomeOrgao(" \t\n ", []), null);
  });
  test("impede duplicados ignorando maiúsculas e espaços", () => {
    assert.notEqual(validarNomeOrgao(" mpt ", ["MPT"]), null);
    assert.notEqual(validarNomeOrgao("Ministério   Público Estadual", ["Ministério Público Estadual"]), null);
    assert.equal(validarNomeOrgao("TRT", ["MPT"]), null);
  });
  test("normaliza o nome antes de persistir", () => {
    assert.equal(normalizarNomeOrgao("  Novo   Órgão  "), "Novo Órgão");
  });
});