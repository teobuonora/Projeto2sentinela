import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  Paperclip,
  Plus,
  Search,
  Send,
  User,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { DemandaModal } from "@/components/demanda-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { filtrarDemandasPorProtocolo } from "@/lib/busca-protocolo";
import { filtrarDemandasQuadroPrincipal } from "@/lib/arquivamento-demanda";
import { filtrarDemandasPorPeriodoEStatus } from "@/lib/exportar-relatorio";
import {
  INSPETORES,
  SEVERIDADE_CLASS,
  SEVERIDADE_LABEL,
  STATUS_LIST,
  formatarData,
  labelStatus,
  severidade,
  useSentinela,
  type Demanda,
  type Status,
} from "@/lib/sentinela-data";
import { orgaosQueryOptions, useOrgaos } from "@/lib/orgaos";

export const Route = createFileRoute("/_authenticated/demandas")({
  validateSearch: (search: Record<string, unknown>): { protocolo?: string } => {
    const protocolo = typeof search["protocolo"] === "string" ? search["protocolo"].trim() : "";
    return protocolo ? { protocolo } : {};
  },
  loader: ({ context }) => context.queryClient.ensureQueryData(orgaosQueryOptions),
  head: () => ({
    meta: [
      { title: "Demandas · Kanban Sentinela VISAT" },
      {
        name: "description",
        content:
          "Quadro Kanban das demandas da VISAT: recebidas, em análise, em atendimento e concluídas, com alertas de prazo legal.",
      },
      { property: "og:title", content: "Demandas · Kanban Sentinela VISAT" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:description",
        content: "Fluxo visual das demandas de MPT, TRT e sindicatos atendidas pela VISAT.",
      },
    ],
  }),
  component: Kanban,
});

function Kanban() {
  const { demandas, mover, registrarRetorno } = useSentinela();
  const { protocolo: protocoloInicial } = Route.useSearch();
  const { data: orgaos = [] } = useOrgaos();
  const opcoesOrgaos = Array.from(new Set([...orgaos.map((o) => o.nome), ...demandas.map((d) => d.orgao)]))
    .filter(Boolean).sort((a, b) => a.localeCompare(b, "pt-BR"));
  const [buscaProtocolo, setBuscaProtocolo] = useState(protocoloInicial ?? "");
  const [orgao, setOrgao] = useState("todos");
  const [inspetor, setInspetor] = useState("todos");
  const [status, setStatus] = useState("todos");
  const [periodoDe, setPeriodoDe] = useState("");
  const [periodoAte, setPeriodoAte] = useState("");
  const [arrastando, setArrastando] = useState<string | null>(null);
  const [sobre, setSobre] = useState<Status | null>(null);
  const [aberta, setAberta] = useState<Demanda | null>(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (protocoloInicial !== undefined) {
      setBuscaProtocolo(protocoloInicial);
    }
  }, [protocoloInicial]);

  const temBuscaProtocolo = buscaProtocolo.trim().length > 0;

  const demandasQuadro = useMemo(() => filtrarDemandasQuadroPrincipal(demandas), [demandas]);

  const filtradas = useMemo(
    () =>
      filtrarDemandasPorPeriodoEStatus(
        filtrarDemandasPorProtocolo(demandasQuadro, buscaProtocolo).filter(
          (d) =>
            (orgao === "todos" || d.orgao === orgao) &&
            (inspetor === "todos" || d.inspetor === inspetor),
        ),
        { de: periodoDe, ate: periodoAte, status },
      ),
    [demandasQuadro, buscaProtocolo, orgao, inspetor, status, periodoDe, periodoAte],
  );

  const exportar = async (formato: "PDF" | "CSV") => {
    if (!filtradas.length) {
      toast.error("Nenhuma demanda para exportar com os filtros atuais.");
      return;
    }
    try {
      const { exportarDemandasCsv, exportarDemandasPdf } = await import("@/lib/exportar-relatorio");
      if (formato === "CSV") {
        exportarDemandasCsv(filtradas);
      } else {
        const resumo = [
          `Período: ${periodoDe ? formatarData(periodoDe) : "início"} a ${periodoAte ? formatarData(periodoAte) : "todos"}`,
          `Status: ${status === "todos" ? "Todos" : labelStatus(status as Status)}`,
          orgao !== "todos" ? `Órgão: ${orgao}` : null,
          inspetor !== "todos" ? `Inspetor: ${inspetor}` : null,
          temBuscaProtocolo ? `Protocolo: ${buscaProtocolo.trim()}` : null,
        ]
          .filter(Boolean)
          .join(" · ");
        await exportarDemandasPdf(filtradas, resumo);
      }
      toast.success(`Relatório ${formato} baixado`, {
        description: `${filtradas.length} demanda(s) incluída(s) no arquivo.`,
      });
    } catch {
      toast.error("Não foi possível exportar as demandas.");
    }
  };

  const abrir = (d: Demanda | null) => {
    setAberta(d);
    setModal(true);
  };

  return (
    <div className="space-y-5 p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Demandas</h1>
          <p className="text-sm text-muted-foreground">
            Arraste os cartões entre as colunas para atualizar o status do fluxo.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="lg">
                <Download className="size-4" />
                Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => exportar("PDF")}>
                <FileText className="size-4" />
                Exportar PDF ({filtradas.length})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportar("CSV")}>
                <FileSpreadsheet className="size-4" />
                Exportar CSV ({filtradas.length})
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="lg" onClick={() => abrir(null)}>
            <Plus className="size-4" />
            Nova Demanda
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-3 card-elevated">
        <div className="relative min-w-[260px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={buscaProtocolo}
            onChange={(e) => setBuscaProtocolo(e.target.value)}
            placeholder="Buscar por número de protocolo (ex.: VISAT-2026-00841)"
            aria-label="Buscar demanda por número de protocolo"
            className="bg-background pl-9 pr-9"
          />
          {temBuscaProtocolo && (
            <button
              type="button"
              onClick={() => setBuscaProtocolo("")}
              aria-label="Limpar busca por protocolo"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Filter className="size-4" />
          Filtros
        </span>
        <FiltroSelect valor={orgao} aoMudar={setOrgao} rotulo="Órgão solicitante" opcoes={opcoesOrgaos} />
        <FiltroSelect
          valor={inspetor}
          aoMudar={setInspetor}
          rotulo="Inspetor responsável"
          opcoes={INSPETORES}
        />
        <FiltroSelect
          valor={status}
          aoMudar={setStatus}
          rotulo="Status"
          opcoes={STATUS_LIST.map((s) => s.label)}
          valores={STATUS_LIST.map((s) => s.id)}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Input
            type="date"
            value={periodoDe}
            onChange={(e) => setPeriodoDe(e.target.value)}
            aria-label="Prazo a partir de"
            title="Prazo a partir de"
            className="w-[155px] bg-background"
          />
          <span className="text-xs text-muted-foreground">até</span>
          <Input
            type="date"
            value={periodoAte}
            onChange={(e) => setPeriodoAte(e.target.value)}
            aria-label="Prazo até"
            title="Prazo até"
            className="w-[155px] bg-background"
          />
        </div>
        {(temBuscaProtocolo ||
          orgao !== "todos" ||
          inspetor !== "todos" ||
          status !== "todos" ||
          periodoDe ||
          periodoAte) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setBuscaProtocolo("");
              setOrgao("todos");
              setInspetor("todos");
              setStatus("todos");
              setPeriodoDe("");
              setPeriodoAte("");
            }}
          >
            Limpar filtros
          </Button>
        )}
      </div>

      {temBuscaProtocolo && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-accent/40 px-3.5 py-2 text-sm">
          <span>
            {filtradas.length === 0
              ? `Nenhuma demanda encontrada para o protocolo "${buscaProtocolo.trim()}".`
              : filtradas.length === 1
                ? `1 demanda localizada para "${buscaProtocolo.trim()}".`
                : `${filtradas.length} demandas localizadas para "${buscaProtocolo.trim()}".`}
          </span>
          <Button variant="ghost" size="sm" onClick={() => setBuscaProtocolo("")}>
            Mostrar todas
          </Button>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-4">
        {STATUS_LIST.map((coluna) => {
          const cards = filtradas.filter((d) => d.status === coluna.id);
          return (
            <section
              key={coluna.id}
              onDragOver={(e) => {
                e.preventDefault();
                setSobre(coluna.id);
              }}
              onDragLeave={() => setSobre((s) => (s === coluna.id ? null : s))}
              onDrop={() => {
                if (arrastando) {
                  mover(arrastando, coluna.id);
                  toast.success(`Demanda movida para ${coluna.label}`);
                }
                setArrastando(null);
                setSobre(null);
              }}
              className={`flex min-h-[420px] flex-col gap-3 rounded-xl border p-3 transition-colors ${
                sobre === coluna.id ? "border-primary bg-accent/60" : "border-border bg-secondary/60"
              }`}
            >
              <header className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {coluna.label}
                </h2>
                <span className="rounded-full bg-card px-2 py-0.5 text-xs font-medium tabular-nums text-muted-foreground">
                  {cards.length}
                </span>
              </header>

              {cards.map((d) => {
                const sev = severidade(d.prazo);
                return (
                  <article
                    key={d.id}
                    draggable
                    onDragStart={() => setArrastando(d.id)}
                    onDragEnd={() => setArrastando(null)}
                    onClick={() => abrir(d)}
                    className={`cursor-grab rounded-lg border bg-card p-3 card-elevated transition-transform active:cursor-grabbing hover:-translate-y-0.5 ${
                      temBuscaProtocolo ? "border-primary/60 ring-1 ring-primary/30" : "border-border"
                    } ${
                      arrastando === d.id ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold tabular-nums">{d.protocolo}</p>
                      <Badge variant="outline" className="shrink-0 bg-accent text-accent-foreground">
                        {d.orgao}
                      </Badge>
                    </div>
                    {d.assunto && (
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{d.assunto}</p>
                    )}
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                        <User className="size-3.5 shrink-0" />
                        <span className="truncate">{d.inspetor}</span>
                      </span>
                      {d.anexos.length > 0 && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Paperclip className="size-3.5" />
                          {d.anexos.length}
                        </span>
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      className={`mt-3 w-full justify-center gap-1.5 ${
                        d.status === "concluidas"
                          ? "bg-success-soft text-success border-success/25"
                          : SEVERIDADE_CLASS[sev]
                      }`}
                    >
                      {d.status === "concluidas" ? (
                        <>
                          <CheckCircle2 className="size-3.5" />
                          {d.data_encerramento
                            ? `Respondida · ${formatarData(d.data_encerramento)}`
                            : "Respondida"}
                        </>
                      ) : (
                        `${SEVERIDADE_LABEL[sev]} · ${formatarData(d.prazo)}`
                      )}
                    </Badge>
                    {d.status === "atendimento" && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2 w-full text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          const encerrada = registrarRetorno(d);
                          toast.success("Demanda marcada como Respondida", {
                            description: `${encerrada.protocolo} movida para Concluídas em ${formatarData(encerrada.data_encerramento!)}.`,
                          });
                        }}
                      >
                        <Send className="size-3.5" />
                        Marcar como Respondida
                      </Button>
                    )}
                  </article>
                );
              })}

              {cards.length === 0 && (
                <p className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                  Nenhuma demanda nesta coluna
                </p>
              )}
            </section>
          );
        })}
      </div>

      <DemandaModal open={modal} onOpenChange={setModal} demanda={aberta} />
    </div>
  );
}

function FiltroSelect({
  valor,
  aoMudar,
  rotulo,
  opcoes,
  valores,
}: {
  valor: string;
  aoMudar: (v: string) => void;
  rotulo: string;
  opcoes: string[];
  valores?: string[];
}) {
  return (
    <Select value={valor} onValueChange={aoMudar}>
      <SelectTrigger aria-label={rotulo} className="w-[210px] bg-card">
        <span className="truncate">
          {valor === "todos"
            ? `${rotulo}: todos`
            : (valores ? opcoes[valores.indexOf(valor)] : valor)}
        </span>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="todos">{rotulo}: todos</SelectItem>
        {opcoes.map((o, i) => (
          <SelectItem key={o} value={valores?.[i] ?? o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
