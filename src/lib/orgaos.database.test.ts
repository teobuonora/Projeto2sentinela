import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

function consultar(sql: string) {
  return spawnSync("psql", ["-X", "-At", "-v", "ON_ERROR_STOP=1", "-c", sql], { encoding: "utf8" });
}

describe("UH7 — regras persistidas e acesso no banco do rascunho", () => {
  test("mantém todos os seis órgãos originais", () => {
    const resultado = consultar("SELECT nome FROM public.orgaos ORDER BY nome;");
    assert.equal(resultado.status, 0);
    const nomes = resultado.stdout.split("\n");
    for (const nome of ["MPT", "TRT", "Sindicato", "Ministério Público Estadual", "CEREST", "Defensoria Pública"]) {
      assert.ok(nomes.includes(nome));
    }
  });
  test("um órgão cadastrado pode ser lido de volta", () => {
    const resultado = consultar("BEGIN; INSERT INTO public.orgaos(nome) VALUES ('Teste transacional UH7') RETURNING nome; SELECT nome FROM public.orgaos WHERE nome='Teste transacional UH7'; ROLLBACK;");
    assert.equal(resultado.status, 0);
    assert.equal(resultado.stdout.split("Teste transacional UH7").length, 3);
  });
  test("o banco recusa cadastro vazio", () => {
    const resultado = consultar("BEGIN; INSERT INTO public.orgaos(nome) VALUES (''); ROLLBACK;");
    assert.notEqual(resultado.status, 0);
    assert.ok(resultado.stderr.includes("orgaos_nome_valido"));
  });
  test("o banco recusa duplicados sem depender da validação do formulário", () => {
    const resultado = consultar("BEGIN; INSERT INTO public.orgaos(nome) VALUES ('mpt'); ROLLBACK;");
    assert.notEqual(resultado.status, 0);
    assert.ok(resultado.stderr.includes("orgaos_nome_unique"));
  });
  test("anônimos não podem ler ou cadastrar", () => {
    const resultado = consultar("SELECT has_table_privilege('anon','public.orgaos','SELECT'), has_table_privilege('anon','public.orgaos','INSERT');");
    assert.equal(resultado.status, 0);
    assert.equal(resultado.stdout.trim(), "f|f");
    const politicas = consultar("SELECT count(*) FROM pg_policies WHERE schemaname='public' AND tablename='orgaos' AND ('anon'=ANY(roles) OR 'public'=ANY(roles));");
    assert.equal(politicas.status, 0);
    assert.equal(politicas.stdout.trim(), "0");
  });
  test("cadastro não concede edição ou exclusão a autenticados", () => {
    const resultado = consultar("SELECT has_table_privilege('authenticated','public.orgaos','UPDATE'), has_table_privilege('authenticated','public.orgaos','DELETE');");
    assert.equal(resultado.status, 0);
    assert.equal(resultado.stdout.trim(), "f|f");
  });
  test("autenticados têm leitura e cadastro com proteção de linhas habilitada", () => {
    const resultado = consultar("SELECT has_table_privilege('authenticated','public.orgaos','SELECT'), has_table_privilege('authenticated','public.orgaos','INSERT'), relrowsecurity FROM pg_class WHERE oid='public.orgaos'::regclass;");
    assert.equal(resultado.status, 0);
    assert.equal(resultado.stdout.trim(), "t|t|t");
  });
});