import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  SEVERIDADE_CLASS,
  SEVERIDADE_LABEL,
  STATUS_LIST,
  formatarData,
  severidade,
  useSentinela,
} from "@/lib/sentinela-data";

export const Route = createFileRoute("/_authenticated/relatorios")({
  head: () => ({
    meta: [
      { title: "Relatórios · Sentinela VISAT" },
      {
        name: "description",
        content:
          "Log de auditoria, histórico de movimentação das demandas e exportação de relatórios gerenciais em PDF e CSV.",
      },
      { property: "og:title", content: "Relatórios · Sentinela VISAT" },
      {
        property: "og:description",
        content: "Auditoria e exportação gerencial das demandas da VISAT Recife.",
      },
    ],
  }),
  component: Relatorios,
});

function Relatorios() {
  const { demandas } = useSentinela();
  const [de, setDe] = useState("");
  const [ate, setAte] = useState("");
  const [status, setStatus] = useState("todos");

  const linhas = useMemo(() => {
    const todas = demandas.flatMap((d) =>
      d.historico.map((h) => ({
        ...h,
        protocolo: d.protocolo,
        orgao: d.orgao,
        inspetor: d.inspetor,
        status: d.status,
        prazo: d.prazo,
      })),
    );
    return todas
      .filter(
        (l) =>
          (status === "todos" || l.status === status) &&
          (!de || l.data >= de) &&
          (!ate || l.data <= ate),
      )
      .sort((a, b) => (a.data < b.data ? 1 : -1));
  }, [demandas, de, ate, status]);

  const exportar = async (formato: "PDF" | "CSV") => {
    if (!linhas.length) {
      toast.error("Nenhum registro para exportar com os filtros atuais.");
      return;
    }
    try {
      const { exportarCsv, exportarPdf } = await import("@/lib/exportar-relatorio");
      if (formato === "CSV") exportarCsv(linhas);
      else
        await exportarPdf(
          linhas,
          `Período ${de || "início"} a ${ate || "hoje"} · Status: ${status}`,
        );
      toast.success(`Relatório ${formato} baixado`, {
        description: `${linhas.length} registros de auditoria incluídos.`,
      });
    } catch {
      toast.error("Não foi possível gerar o relatório.");
    }
  };

  return (
    <div className="space-y-5 p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Relatórios</h1>
          <p className="text-sm text-muted-foreground">
            Log de auditoria e histórico completo de movimentação das demandas.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => exportar("PDF")}>
            <FileText className="size-4" />
            Exportar Relatório Gerencial (PDF)
          </Button>
          <Button variant="outline" onClick={() => exportar("CSV")}>
            <Download className="size-4" />
            Exportar (CSV)
          </Button>
        </div>
      </div>

      <Card className="card-elevated border-border">
        <CardContent className="flex flex-wrap items-end gap-4 pt-6">
          <div className="space-y-1.5">
            <Label htmlFor="de">Período de</Label>
            <Input id="de" type="date" value={de} onChange={(e) => setDe(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ate">até</Label>
            <Input id="ate" type="date" value={ate} onChange={(e) => setAte(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Status da inspeção</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                {STATUS_LIST.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="ghost"
            onClick={() => {
              setDe("");
              setAte("");
              setStatus("todos");
            }}
          >
            Limpar
          </Button>
        </CardContent>
      </Card>

      <Card className="card-elevated border-border">
        <CardHeader>
          <CardTitle className="text-base">
            Auditoria de movimentações ({linhas.length} registros)
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Protocolo</TableHead>
                <TableHead>Órgão</TableHead>
                <TableHead>Inspetor</TableHead>
                <TableHead>Movimentação</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Prazo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {linhas.map((l, i) => (
                <TableRow key={i}>
                  <TableCell className="tabular-nums">{formatarData(l.data)}</TableCell>
                  <TableCell className="font-medium tabular-nums">{l.protocolo}</TableCell>
                  <TableCell>{l.orgao}</TableCell>
                  <TableCell>{l.inspetor}</TableCell>
                  <TableCell className="text-muted-foreground">{l.acao}</TableCell>
                  <TableCell>{l.autor}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={SEVERIDADE_CLASS[severidade(l.prazo)]}>
                      {SEVERIDADE_LABEL[severidade(l.prazo)]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {linhas.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                    Nenhum registro no período selecionado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
