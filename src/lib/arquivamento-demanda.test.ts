import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { arquivarDemanda, filtrarDemandasQuadroPrincipal } from "./arquivamento-demanda";
import type { Demanda } from "./sentinela-data";

const base: Demanda = {
  id: "dem-13",
  protocolo: "VISAT-2026-00913",
  orgao: "MPT",
  inspetor: "João Furtado",
  prazo: "2026-12-05",
  status: "recebidas",
  assunto: "Demanda duplicada para teste",
  parecer: "",
  anexos: ["oficio-duplicado.pdf"],
  historico: [{ data: "2026-11-20", autor: "Sistema", acao: "Demanda recebida do MPT" }],
  data_encerramento: null,
};

describe("UH13 — arquivamento de demandas inválidas", () => {
  test("altera o status para arquivada e preserva os registros anteriores no histórico", () => {
    const arquivada = arquivarDemanda(base, "Lucas Soares", "2026-11-25");
    assert.equal(arquivada.status, "arquivada");
    assert.equal(arquivada.protocolo, base.protocolo);
    assert.deepEqual(arquivada.anexos, base.anexos);
    assert.equal(arquivada.historico.length, 2);
    const ultimo = arquivada.historico[1];
    assert.ok(ultimo);
    assert.equal(ultimo.data, "2026-11-25");
    assert.equal(ultimo.autor, "Lucas Soares");
    assert.match(ultimo.acao, /arquivada/i);
  });

  test("remove o card arquivado da visualização do quadro principal mantendo os demais", () => {
    const arquivada = arquivarDemanda(base, "Lucas Soares", "2026-11-25");
    const ativa: Demanda = { ...base, id: "dem-14", protocolo: "VISAT-2026-00914", status: "analise" };
    const concluida: Demanda = { ...base, id: "dem-15", protocolo: "VISAT-2026-00915", status: "concluidas" };

    const visiveis = filtrarDemandasQuadroPrincipal([arquivada, ativa, concluida]);
    assert.deepEqual(
      visiveis.map((d) => d.id),
      ["dem-14", "dem-15"],
    );
  });
});