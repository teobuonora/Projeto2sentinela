import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter, Paperclip, Plus, User } from "lucide-react";
import { toast } from "sonner";

import { DemandaModal } from "@/components/demanda-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  INSPETORES,
  ORGAOS,
  SEVERIDADE_CLASS,
  SEVERIDADE_LABEL,
  STATUS_LIST,
  formatarData,
  severidade,
  useSentinela,
  type Demanda,
  type Status,
} from "@/lib/sentinela-data";

export const Route = createFileRoute("/demandas")({
  head: () => ({
    meta: [
      { title: "Demandas · Kanban Sentinela VISAT" },
      {
        name: "description",
        content:
          "Quadro Kanban das demandas da VISAT: recebidas, em análise, em atendimento e concluídas, com alertas de prazo legal.",
      },
      { property: "og:title", content: "Demandas · Kanban Sentinela VISAT" },
      {
        property: "og:description",
        content: "Fluxo visual das demandas de MPT, TRT e sindicatos atendidas pela VISAT.",
      },
    ],
  }),
  component: Kanban,
});

function Kanban() {
  const { demandas, mover } = useSentinela();
  const [orgao, setOrgao] = useState("todos");
  const [inspetor, setInspetor] = useState("todos");
  const [status, setStatus] = useState("todos");
  const [arrastando, setArrastando] = useState<string | null>(null);
  const [sobre, setSobre] = useState<Status | null>(null);
  const [aberta, setAberta] = useState<Demanda | null>(null);
  const [modal, setModal] = useState(false);

  const filtradas = useMemo(
    () =>
      demandas.filter(
        (d) =>
          (orgao === "todos" || d.orgao === orgao) &&
          (inspetor === "todos" || d.inspetor === inspetor) &&
          (status === "todos" || d.status === status),
      ),
    [demandas, orgao, inspetor, status],
  );

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
        <Button size="lg" onClick={() => abrir(null)}>
          <Plus className="size-4" />
          Nova Demanda
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-3 card-elevated">
        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Filter className="size-4" />
          Filtros
        </span>
        <FiltroSelect valor={orgao} aoMudar={setOrgao} rotulo="Órgão solicitante" opcoes={ORGAOS} />
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
        {(orgao !== "todos" || inspetor !== "todos" || status !== "todos") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setOrgao("todos");
              setInspetor("todos");
              setStatus("todos");
            }}
          >
            Limpar filtros
          </Button>
        )}
      </div>

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
                    className={`cursor-grab rounded-lg border border-border bg-card p-3 card-elevated transition-transform active:cursor-grabbing hover:-translate-y-0.5 ${
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
                      className={`mt-3 w-full justify-center ${SEVERIDADE_CLASS[sev]}`}
                    >
                      {SEVERIDADE_LABEL[sev]} · {formatarData(d.prazo)}
                    </Badge>
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
      <SelectTrigger className="w-[210px] bg-card">
        <SelectValue placeholder={rotulo} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="todos">{rotulo}: todos</SelectItem>
        {opcoes.map((o, i) => (
          <SelectItem key={o} value={valores ? valores[i] : o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
