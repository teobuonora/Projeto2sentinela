import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AlertTriangle, ArrowUpRight, CalendarClock, CheckCircle2, FolderOpen, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  INSPETORES,
  SEVERIDADE_CLASS,
  SEVERIDADE_LABEL,
  STATUS_LIST,
  diasRestantes,
  formatarData,
  severidade,
  useSentinela,
} from "@/lib/sentinela-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · Sentinela VISAT" },
      {
        name: "description",
        content:
          "Visão geral das demandas ativas, prazos legais próximos do vencimento e carga de trabalho dos inspetores da VISAT.",
      },
      { property: "og:title", content: "Dashboard · Sentinela VISAT" },
      {
        property: "og:description",
        content: "Painel gerencial de demandas e prazos legais da VISAT Recife.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { demandas } = useSentinela();
  const [busca, setBusca] = useState("");

  const ativas = demandas.filter((d) => d.status !== "concluidas");
  const criticas = ativas.filter((d) => diasRestantes(d.prazo) <= 5);
  const concluidas = demandas.filter((d) => d.status === "concluidas");

  const resultados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return [];
    return demandas.filter(
      (d) => d.protocolo.toLowerCase().includes(q) || d.assunto.toLowerCase().includes(q),
    );
  }, [busca, demandas]);

  const carga = INSPETORES.map((nome) => ({
    nome,
    total: ativas.filter((d) => d.inspetor === nome).length,
  })).sort((a, b) => b.total - a.total);
  const maxCarga = Math.max(1, ...carga.map((c) => c.total));

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Panorama em tempo real das demandas externas recebidas pela VISAT.
          </p>
        </div>
      </div>

      <Card className="card-elevated border-border">
        <CardContent className="space-y-3 pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Busca rápida por número de protocolo (ex.: VISAT-2026-00841)"
              className="h-12 pl-10 text-base"
            />
          </div>
          {busca && (
            <div className="divide-y divide-border rounded-lg border border-border">
              {resultados.length === 0 && (
                <p className="p-3 text-sm text-muted-foreground">Nenhum protocolo encontrado.</p>
              )}
              {resultados.map((d) => (
                <div key={d.id} className="flex flex-wrap items-center justify-between gap-2 p-3">
                  <div>
                    <p className="font-medium tabular-nums">{d.protocolo}</p>
                    <p className="text-sm text-muted-foreground">
                      {d.orgao} · {d.assunto}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {STATUS_LIST.find((s) => s.id === d.status)?.label}
                    </Badge>
                    <Badge variant="outline" className={SEVERIDADE_CLASS[severidade(d.prazo)]}>
                      {formatarData(d.prazo)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          titulo="Demandas ativas"
          valor={ativas.length}
          detalhe={`${demandas.length} demandas cadastradas no total`}
          icone={<FolderOpen className="size-5" />}
        />
        <MetricCard
          titulo="Prazos próximos do vencimento"
          valor={criticas.length}
          detalhe="Vencendo em até 5 dias ou já atrasadas"
          icone={<AlertTriangle className="size-5" />}
          destaque
        />
        <MetricCard
          titulo="Concluídas"
          valor={concluidas.length}
          detalhe="Com retorno institucional registrado"
          icone={<CheckCircle2 className="size-5" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="card-elevated border-border lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Carga de trabalho por inspetor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {carga.map((c) => (
              <div key={c.nome} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{c.nome}</span>
                  <span className="text-muted-foreground">{c.total} demandas ativas</span>
                </div>
                <Progress value={(c.total / maxCarga) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-elevated border-border lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Prazos em alerta</CardTitle>
            <CalendarClock className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-3">
            {criticas.length === 0 && (
              <p className="text-sm text-muted-foreground">Nenhum prazo crítico no momento.</p>
            )}
            {criticas
              .sort((a, b) => diasRestantes(a.prazo) - diasRestantes(b.prazo))
              .map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium tabular-nums">{d.protocolo}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {d.orgao} · {d.inspetor}
                    </p>
                  </div>
                  <Badge variant="outline" className={SEVERIDADE_CLASS[severidade(d.prazo)]}>
                    {SEVERIDADE_LABEL[severidade(d.prazo)]}
                  </Badge>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({
  titulo,
  valor,
  detalhe,
  icone,
  destaque,
}: {
  titulo: string;
  valor: number;
  detalhe: string;
  icone: React.ReactNode;
  destaque?: boolean;
}) {
  return (
    <Card className="card-elevated border-border">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{titulo}</p>
            <p
              className={`mt-2 font-display text-4xl font-semibold ${destaque ? "text-danger" : "text-foreground"}`}
            >
              {valor}
            </p>
          </div>
          <span
            className={`flex size-10 items-center justify-center rounded-lg ${
              destaque ? "bg-danger-soft text-danger" : "bg-accent text-accent-foreground"
            }`}
          >
            {icone}
          </span>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{detalhe}</p>
      </CardContent>
    </Card>
  );
}
