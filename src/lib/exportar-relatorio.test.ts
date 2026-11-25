import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import {
  filtrarDemandasPorPeriodoEStatus,
  gerarTextoCsvDemandas,
  mapearDemandasParaExportacao,
} from "./exportar-relatorio";
import type { Demanda } from "./sentinela-data";

const demandasBase: Demanda[] = [
  {
    id: "d-1",
    protocolo: "VISAT-2026-00841",
    orgao: "MPT",
    inspetor: "João Furtado",
    prazo: "2026-11-10",
    status: "analise",
    assunto: "Inquérito civil - frigorífico zona oeste",
    parecer: "",
    anexos: [],
    historico: [
      { data: "2026-11-01", autor: "Sistema", acao: "Recebida" },
      { data: "2026-11-03", autor: "João Furtado", acao: "Movida para Em Análise" },
    ],
    data_encerramento: null,
  },
  {
    id: "d-2",
    protocolo: "VISAT-2026-00857",
    orgao: "TRT",
    inspetor: "Rafael Lins",
    prazo: "2026-11-25",
    status: "concluidas",
    assunto: "Perícia de insalubridade; obra \"Centro\"",
    parecer: "",
    anexos: [],
    historico: [{ data: "2026-11-05", autor: "Rafael Lins", acao: "Respondida" }],
    data_encerramento: "2026-11-20",
  },
  {
    id: "d-3",
    protocolo: "VISAT-2026-00900",
    orgao: "Sindicato",
    inspetor: "Téo Buonora",
    prazo: "2026-12-15",
    status: "recebidas",
    assunto: "Denúncia de ruído excessivo",
    parecer: "",
    anexos: [],
    historico: [{ data: "2026-11-22", autor: "Sistema", acao: "Recebida" }],
    data_encerramento: null,
  },
];

describe("HU16 — exportação de relatório gerencial", () => {
  test("filtra demandas por período de prazo e status", () => {
    const porPeriodo = filtrarDemandasPorPeriodoEStatus(demandasBase, {
      de: "2026-11-01",
      ate: "2026-11-30",
      status: "todos",
    });
    assert.deepEqual(
      porPeriodo.map((d) => d.protocolo),
      ["VISAT-2026-00841", "VISAT-2026-00857"],
    );

    const porStatus = filtrarDemandasPorPeriodoEStatus(demandasBase, {
      de: "2026-11-01",
      ate: "2026-11-30",
      status: "concluidas",
    });
    assert.deepEqual(
      porStatus.map((d) => d.protocolo),
      ["VISAT-2026-00857"],
    );
  });

  test("gera uma linha por card com Protocolo, Órgão, Status legível e Prazo formatado", () => {
    const linhas = mapearDemandasParaExportacao(demandasBase);
    assert.equal(linhas.length, 3);
    assert.deepEqual(linhas[0], {
      protocolo: "VISAT-2026-00841",
      orgao: "MPT",
      status: "Em Análise",
      prazo: "10/11/2026",
      inspetor: "João Furtado",
      assunto: "Inquérito civil - frigorífico zona oeste",
    });
  });

  test("exporta CSV contendo cabeçalhos obrigatórios e escapando aspas", () => {
    const csv = gerarTextoCsvDemandas(demandasBase.slice(0, 2));
    const [cabecalho, linha1, linha2] = csv.split("\r\n");
    assert.equal(cabecalho, '"Protocolo";"Órgão";"Status";"Prazo";"Inspetor";"Assunto"');
    assert.equal(
      linha1,
      '"VISAT-2026-00841";"MPT";"Em Análise";"10/11/2026";"João Furtado";"Inquérito civil - frigorífico zona oeste"',
    );
    assert.equal(
      linha2,
      '"VISAT-2026-00857";"TRT";"Concluídas";"25/11/2026";"Rafael Lins";"Perícia de insalubridade; obra ""Centro"""',
    );
  });
});