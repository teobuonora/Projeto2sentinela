import type { Demanda } from "./sentinela-data";

export function dataLocalIso(ref: Date = new Date()): string {
  const ano = ref.getFullYear();
  const mes = String(ref.getMonth() + 1).padStart(2, "0");
  const dia = String(ref.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

export function marcarComoRespondida(
  demanda: Demanda,
  autor: string,
  dataEncerramento: string = dataLocalIso(),
): Demanda {
  const responsavel = autor.trim() || "Servidor";
  return {
    ...demanda,
    status: "concluidas",
    data_encerramento: dataEncerramento,
    historico: [
      ...demanda.historico,
      {
        data: dataEncerramento,
        autor: responsavel,
        acao: "Demanda marcada como Respondida (retorno institucional registrado)",
      },
    ],
  };
}