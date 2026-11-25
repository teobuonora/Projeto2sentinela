import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { marcarComoRespondida } from "./retorno-institucional";
import type { Demanda } from "./sentinela-data";

const base: Demanda = {
  id: "dem-1",
  protocolo: "VISAT-2026-00901",
  orgao: "MPT",
  inspetor: "João Furtado",
  prazo: "2026-11-30",
  status: "atendimento",
  assunto: "Inspeção sanitária",
  parecer: "Inspeção concluída sem pendências.",
  anexos: [],
  historico: [{ data: "2026-11-10", autor: "Sistema", acao: "Demanda recebida do MPT" }],
  data_encerramento: null,
};

describe("UH11 — registro de retorno à instituição demandante", () => {
  test("move o card para a última coluna do fluxo e registra a data de encerramento", () => {
    const respondida = marcarComoRespondida(base, "Lucas Soares", "2026-11-25");
    assert.equal(respondida.status, "concluidas");
    assert.equal(respondida.data_encerramento, "2026-11-25");
  });

  test("preserva o histórico anterior e adiciona o registro formal com autoria", () => {
    const respondida = marcarComoRespondida(base, "Lucas Soares", "2026-11-25");
    assert.equal(respondida.historico.length, 2);
    const ultimo = respondida.historico[1];
    assert.ok(ultimo);
    assert.equal(ultimo.data, "2026-11-25");
    assert.equal(ultimo.autor, "Lucas Soares");
    assert.match(ultimo.acao, /Respondida/i);
  });
});