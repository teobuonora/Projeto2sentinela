import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AlertTriangle, ArrowUpRight, CalendarClock, CheckCircle2, Eye, FolderOpen, Search, X } from "lucide-react";

import { DemandaModal } from "@/components/demanda-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { filtrarDemandasPorProtocolo } from "@/lib/busca-protocolo";
import {
  INSPETORES,
  SEVERIDADE_CLASS,
  SEVERIDADE_LABEL,
  STATUS_LIST,
  diasRestantes,
  formatarData,
  severidade,
  useSentinela,
  type Demanda,
} from "@/lib/sentinela-data";

export const Route = createFileRoute("/_authenticated/")({
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
  const [selecionada, setSelecionada] = useState<Demanda | null>(null);
  const [modalAberta, setModalAberta] = useState(false);

  const ativas = demandas.filter((d) => d.status !== "concluidas");
  const criticas = ativas.filter((d) => diasRestantes(d.prazo) <= 5);
  const concluidas = demandas.filter((d) => d.status === "concluidas");

  const resultados = useMemo(() => {
    if (!busca.trim()) return [];
    return filtrarDemandasPorProtocolo(demandas, busca);
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
              aria-label="Busca rápida por número de protocolo"
              className="h-12 pl-10 pr-10 text-base"
            />
            {busca && (
              <button
                type="button"
                onClick={() => setBusca("")}
                aria-label="Limpar busca"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          {busca && (
            <div className="divide-y divide-border rounded-lg border border-border">
              {resultados.length === 0 && (
                <p className="p-3 text-sm text-muted-foreground">Nenhum protocolo encontrado.</p>
              )}
              {resultados.map((d) => (
                <div
                  key={d.id}
                  className="flex flex-wrap items-center justify-between gap-2 p-3 transition-colors hover:bg-accent/40"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelecionada(d);
                      setModalAberta(true);
                    }}
                    aria-label={`Ver detalhes da demanda ${d.protocolo}`}
                    className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-3 text-left"
                  >
                    <span className="min-w-0 flex-1">
                      <p className="font-medium tabular-nums">{d.protocolo}</p>
                      <p className="text-sm text-muted-foreground">
                        {d.orgao} · {d.assunto}
                      </p>
                    </span>
                    <span className="flex shrink-0 items-center gap-2">
                      <Badge variant="outline">
                        {STATUS_LIST.find((s) => s.id === d.status)?.label}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          d.status === "concluidas"
                            ? "bg-success-soft text-success border-success/25"
                            : SEVERIDADE_CLASS[severidade(d.prazo)]
                        }
                      >
                        {d.status === "concluidas" && d.data_encerramento
                          ? `Respondida · ${formatarData(d.data_encerramento)}`
                          : formatarData(d.prazo)}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs font-medium text-primary">
                        <Eye className="size-3.5" />
                        Ver detalhes
                      </span>
                    </span>
                  </button>
                  <Button variant="ghost" size="sm" asChild className="shrink-0">
                    <Link to="/demandas" search={{ protocolo: d.protocolo }}>
                      Ver card
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </Button>
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

      <DemandaModal open={modalAberta} onOpenChange={setModalAberta} demanda={selecionada} />
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
