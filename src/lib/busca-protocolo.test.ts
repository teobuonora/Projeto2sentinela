import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { filtrarDemandasPorProtocolo } from "./busca-protocolo";
import type { Demanda } from "./sentinela-data";

const demandas: Demanda[] = [
  {
    id: "dem-1",
    protocolo: "VISAT-2026-00841",
    orgao: "MPT",
    inspetor: "João Furtado",
    prazo: "2026-11-30",
    status: "recebidas",
    assunto: "Inspeção em obra civil",
    parecer: "",
    anexos: [],
    historico: [],
    data_encerramento: null,
  },
  {
    id: "dem-2",
    protocolo: "VISAT-2026-00912",
    orgao: "TRT",
    inspetor: "Rafael Gurgel",
    prazo: "2026-12-05",
    status: "concluidas",
    assunto: "Avaliação ergonômica",
    parecer: "Concluída.",
    anexos: [],
    historico: [],
    data_encerramento: "2026-11-20",
  },
];

describe("UH12 — busca rápida por número de protocolo", () => {
  test("localiza o card pelo número exato do protocolo", () => {
    const resultado = filtrarDemandasPorProtocolo(demandas, "VISAT-2026-00841");
    assert.equal(resultado.length, 1);
    assert.equal(resultado[0]?.id, "dem-1");
  });

  test("localiza o card por trecho parcial sem diferenciar maiúsculas ou separadores", () => {
    assert.equal(filtrarDemandasPorProtocolo(demandas, "00912")[0]?.id, "dem-2");
    assert.equal(filtrarDemandasPorProtocolo(demandas, "visat 2026 00841")[0]?.id, "dem-1");
  });

  test("retorna lista vazia quando nenhum protocolo corresponde e todas quando busca está vazia", () => {
    assert.equal(filtrarDemandasPorProtocolo(demandas, "VISAT-2026-99999").length, 0);
    assert.equal(filtrarDemandasPorProtocolo(demandas, "   ").length, 2);
  });
});