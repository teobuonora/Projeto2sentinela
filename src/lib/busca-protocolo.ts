import type { Demanda } from "./sentinela-data";

function normalizarProtocolo(valor: string): string {
  return valor.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function correspondeAoProtocolo(protocolo: string, termo: string): boolean {
  const consulta = termo.trim().toLowerCase();
  if (!consulta) return true;

  if (protocolo.toLowerCase().includes(consulta)) {
    return true;
  }

  const consultaNormalizada = normalizarProtocolo(consulta);
  if (!consultaNormalizada) return false;

  return normalizarProtocolo(protocolo).includes(consultaNormalizada);
}

export function filtrarDemandasPorProtocolo(demandas: Demanda[], termo: string): Demanda[] {
  if (!termo.trim()) return demandas;
  return demandas.filter((d) => correspondeAoProtocolo(d.protocolo, termo));
}