import { dataLocalIso } from "./retorno-institucional";
import type { Demanda } from "./sentinela-data";

export function estaArquivada(demanda: Pick<Demanda, "status">): boolean {
  return demanda.status === "arquivada";
}

export function filtrarDemandasQuadroPrincipal<T extends Pick<Demanda, "status">>(demandas: T[]): T[] {
  return demandas.filter((d) => !estaArquivada(d));
}

export function arquivarDemanda(
  demanda: Demanda,
  autor: string,
  dataArquivamento: string = dataLocalIso(),
): Demanda {
  const responsavel = autor.trim() || "Servidor";
  return {
    ...demanda,
    status: "arquivada",
    data_encerramento: demanda.data_encerramento ?? dataArquivamento,
    historico: [
      ...demanda.historico,
      {
        data: dataArquivamento,
        autor: responsavel,
        acao: "Demanda arquivada como inválida",
      },
    ],
  };
}