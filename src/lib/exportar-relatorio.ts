import { formatarData, labelStatus, type Demanda } from "./sentinela-data";

export type LinhaRelatorio = {
  data: string;
  protocolo: string;
  orgao: string;
  inspetor: string;
  status: string;
  prazo: string;
  autor: string;
  acao: string;
};

export type LinhaDemandaExport = {
  protocolo: string;
  orgao: string;
  status: string;
  prazo: string;
  inspetor: string;
  assunto: string;
};

export type FiltrosExportacaoDemandas = {
  de?: string;
  ate?: string;
  status?: string;
};

const COLUNAS = ["Data", "Protocolo", "Órgão", "Inspetor", "Status", "Prazo", "Autor", "Ação"];
const valores = (l: LinhaRelatorio) => [l.data, l.protocolo, l.orgao, l.inspetor, l.status, l.prazo, l.autor, l.acao];

const COLUNAS_DEMANDAS = ["Protocolo", "Órgão", "Status", "Prazo", "Inspetor", "Assunto"];
const valoresDemanda = (l: LinhaDemandaExport) => [
  l.protocolo,
  l.orgao,
  l.status,
  l.prazo,
  l.inspetor,
  l.assunto,
];

export function filtrarDemandasPorPeriodoEStatus<T extends Pick<Demanda, "prazo" | "status">>(
  demandas: T[],
  { de = "", ate = "", status = "todos" }: FiltrosExportacaoDemandas,
): T[] {
  return demandas.filter(
    (d) =>
      (status === "todos" || d.status === status) &&
      (!de || d.prazo >= de) &&
      (!ate || d.prazo <= ate),
  );
}

export function mapearDemandasParaExportacao(demandas: Demanda[]): LinhaDemandaExport[] {
  return demandas.map((d) => ({
    protocolo: d.protocolo,
    orgao: d.orgao,
    status: labelStatus(d.status),
    prazo: formatarData(d.prazo),
    inspetor: d.inspetor,
    assunto: d.assunto,
  }));
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

const carimbo = () => new Date().toISOString().slice(0, 10);

const escCsv = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;

export function gerarTextoCsvDemandas(demandas: Demanda[]): string {
  const linhas = mapearDemandasParaExportacao(demandas);
  return [COLUNAS_DEMANDAS, ...linhas.map(valoresDemanda)]
    .map((r) => r.map(escCsv).join(";"))
    .join("\r\n");
}

export function gerarCsvDemandas(demandas: Demanda[]) {
  return new Blob(["\uFEFF" + gerarTextoCsvDemandas(demandas)], {
    type: "text/csv;charset=utf-8",
  });
}

export function exportarDemandasCsv(demandas: Demanda[]) {
  downloadBlob(gerarCsvDemandas(demandas), `sentinela-demandas-${carimbo()}.csv`);
}

export async function exportarDemandasPdf(demandas: Demanda[], filtros: string) {
  const { jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");
  const linhas = mapearDemandasParaExportacao(demandas);
  const doc = new jsPDF({ orientation: "landscape" });
  doc.setFontSize(16);
  doc.text("Sentinela VISAT — Relatório Gerencial de Demandas", 14, 16);
  doc.setFontSize(10);
  doc.text(`Gerado em ${new Date().toLocaleString("pt-BR")} · ${linhas.length} demanda(s)`, 14, 23);
  doc.text(`Filtros: ${filtros}`, 14, 29);
  autoTable(doc, {
    startY: 34,
    head: [COLUNAS_DEMANDAS],
    body: linhas.map(valoresDemanda),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [31, 78, 145] },
  });
  downloadBlob(doc.output("blob"), `sentinela-demandas-${carimbo()}.pdf`);
}

export function gerarCsv(linhas: LinhaRelatorio[]) {
  const csv = [COLUNAS, ...linhas.map(valores)].map((r) => r.map(escCsv).join(";")).join("\r\n");
  return new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
}

export function exportarCsv(linhas: LinhaRelatorio[]) {
  downloadBlob(gerarCsv(linhas), `sentinela-auditoria-${carimbo()}.csv`);
}

export async function exportarPdf(linhas: LinhaRelatorio[], filtros: string) {
  const { jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");
  const doc = new jsPDF({ orientation: "landscape" });
  doc.setFontSize(16);
  doc.text("Sentinela VISAT — Relatório Gerencial", 14, 16);
  doc.setFontSize(10);
  doc.text(`Gerado em ${new Date().toLocaleString("pt-BR")} · ${linhas.length} registros`, 14, 23);
  doc.text(`Filtros: ${filtros}`, 14, 29);
  autoTable(doc, {
    startY: 34,
    head: [COLUNAS],
    body: linhas.map(valores),
    styles: { fontSize: 8 },
    headStyles: { fillColor: [31, 78, 145] },
  });
  downloadBlob(doc.output("blob"), `sentinela-relatorio-${carimbo()}.pdf`);
}
