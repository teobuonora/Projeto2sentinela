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

const COLUNAS = ["Data", "Protocolo", "Órgão", "Inspetor", "Status", "Prazo", "Autor", "Ação"];
const valores = (l: LinhaRelatorio) => [l.data, l.protocolo, l.orgao, l.inspetor, l.status, l.prazo, l.autor, l.acao];

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

export function gerarCsv(linhas: LinhaRelatorio[]) {
  const esc = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [COLUNAS, ...linhas.map(valores)].map((r) => r.map(esc).join(";")).join("\r\n");
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
  doc.save(`sentinela-relatorio-${carimbo()}.pdf`);
}
