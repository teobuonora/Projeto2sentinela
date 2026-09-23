import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Status = "recebidas" | "analise" | "atendimento" | "concluidas";

export const STATUS_LIST: { id: Status; label: string }[] = [
  { id: "recebidas", label: "Recebidas" },
  { id: "analise", label: "Em Análise" },
  { id: "atendimento", label: "Em Atendimento" },
  { id: "concluidas", label: "Concluídas" },
];

export const ORGAOS = ["MPT", "TRT", "Sindicato", "Ministério Público Estadual", "CEREST", "Defensoria Pública"];
export const INSPETORES = ["João Furtado", "Rafael Lins", "Téo Buonora", "Marina Tavares", "Carla Meneses"];

export type Demanda = {
  id: string;
  protocolo: string;
  orgao: string;
  inspetor: string;
  prazo: string; // ISO date
  status: Status;
  assunto: string;
  parecer: string;
  anexos: string[];
  historico: { data: string; autor: string; acao: string }[];
};

const hoje = new Date();
const iso = (offsetDays: number) => {
  const d = new Date(hoje);
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
};

export function diasRestantes(prazo: string) {
  const d = new Date(prazo + "T00:00:00");
  const base = new Date(new Date().toISOString().slice(0, 10) + "T00:00:00");
  return Math.round((d.getTime() - base.getTime()) / 86400000);
}

export type Severidade = "atrasado" | "hoje" | "atencao" | "prazo";

export function severidade(prazo: string): Severidade {
  const d = diasRestantes(prazo);
  if (d < 0) return "atrasado";
  if (d === 0) return "hoje";
  if (d <= 5) return "atencao";
  return "prazo";
}

export const SEVERIDADE_LABEL: Record<Severidade, string> = {
  atrasado: "Atrasado",
  hoje: "Vence hoje",
  atencao: "Atenção",
  prazo: "No prazo",
};

export const SEVERIDADE_CLASS: Record<Severidade, string> = {
  atrasado: "bg-danger-soft text-danger border-danger/25",
  hoje: "bg-danger-soft text-danger border-danger/25",
  atencao: "bg-warning-soft text-warning border-warning/30",
  prazo: "bg-success-soft text-success border-success/25",
};

export function formatarData(d: string) {
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}

const seed: Demanda[] = [
  {
    id: "1",
    protocolo: "VISAT-2026-00841",
    orgao: "MPT",
    inspetor: "João Furtado",
    prazo: iso(-3),
    status: "analise",
    assunto: "Inquérito civil - frigorífico zona oeste",
    parecer: "Aguardando relatório de inspeção in loco realizado em 12/09.",
    anexos: ["oficio-mpt-841.pdf"],
    historico: [
      { data: iso(-12), autor: "Sistema", acao: "Demanda recebida do MPT" },
      { data: iso(-9), autor: "João Furtado", acao: "Movida para Em Análise" },
    ],
  },
  {
    id: "2",
    protocolo: "VISAT-2026-00857",
    orgao: "TRT",
    inspetor: "Rafael Lins",
    prazo: iso(0),
    status: "atendimento",
    assunto: "Perícia de insalubridade - construção civil",
    parecer: "Parecer técnico em redação final.",
    anexos: ["laudo-preliminar.pdf", "planilha-medicoes.csv"],
    historico: [
      { data: iso(-8), autor: "Sistema", acao: "Demanda recebida do TRT" },
      { data: iso(-4), autor: "Rafael Lins", acao: "Movida para Em Atendimento" },
    ],
  },
  {
    id: "3",
    protocolo: "VISAT-2026-00862",
    orgao: "Sindicato",
    inspetor: "Téo Buonora",
    prazo: iso(4),
    status: "recebidas",
    assunto: "Denúncia de exposição a agentes químicos",
    parecer: "",
    anexos: [],
    historico: [{ data: iso(-1), autor: "Sistema", acao: "Demanda recebida do Sindicato" }],
  },
  {
    id: "4",
    protocolo: "VISAT-2026-00863",
    orgao: "CEREST",
    inspetor: "Marina Tavares",
    prazo: iso(12),
    status: "recebidas",
    assunto: "Investigação de acidente de trabalho grave",
    parecer: "",
    anexos: [],
    historico: [{ data: iso(-1), autor: "Sistema", acao: "Demanda recebida do CEREST" }],
  },
  {
    id: "5",
    protocolo: "VISAT-2026-00799",
    orgao: "MPT",
    inspetor: "Téo Buonora",
    prazo: iso(9),
    status: "atendimento",
    assunto: "Termo de ajustamento de conduta - call center",
    parecer: "Vistoria agendada com a empresa para a próxima semana.",
    anexos: ["tac-visat.pdf"],
    historico: [{ data: iso(-20), autor: "Sistema", acao: "Demanda recebida do MPT" }],
  },
  {
    id: "6",
    protocolo: "VISAT-2026-00770",
    orgao: "Defensoria Pública",
    inspetor: "Carla Meneses",
    prazo: iso(2),
    status: "analise",
    assunto: "Condições ergonômicas em central de distribuição",
    parecer: "Solicitada documentação complementar ao empregador.",
    anexos: [],
    historico: [{ data: iso(-15), autor: "Sistema", acao: "Demanda recebida da Defensoria" }],
  },
  {
    id: "7",
    protocolo: "VISAT-2026-00712",
    orgao: "TRT",
    inspetor: "João Furtado",
    prazo: iso(-25),
    status: "concluidas",
    assunto: "Laudo de ruído - metalúrgica",
    parecer: "Retorno institucional enviado ao TRT em tempo hábil.",
    anexos: ["relatorio-final.pdf"],
    historico: [{ data: iso(-30), autor: "João Furtado", acao: "Retorno institucional registrado" }],
  },
  {
    id: "8",
    protocolo: "VISAT-2026-00689",
    orgao: "Sindicato",
    inspetor: "Rafael Lins",
    prazo: iso(-40),
    status: "concluidas",
    assunto: "Fiscalização de EPIs em cooperativa",
    parecer: "Demanda concluída e arquivada.",
    anexos: [],
    historico: [{ data: iso(-42), autor: "Rafael Lins", acao: "Concluída" }],
  },
  {
    id: "9",
    protocolo: "VISAT-2026-00866",
    orgao: "MPT",
    inspetor: "Marina Tavares",
    prazo: iso(6),
    status: "analise",
    assunto: "Trabalho em altura - rede de supermercados",
    parecer: "",
    anexos: [],
    historico: [{ data: iso(-2), autor: "Sistema", acao: "Demanda recebida do MPT" }],
  },
  {
    id: "10",
    protocolo: "VISAT-2026-00868",
    orgao: "Ministério Público Estadual",
    inspetor: "Carla Meneses",
    prazo: iso(1),
    status: "recebidas",
    assunto: "Assédio moral organizacional - órgão público",
    parecer: "",
    anexos: [],
    historico: [{ data: iso(0), autor: "Sistema", acao: "Demanda recebida do MPE" }],
  },
];

type Ctx = {
  demandas: Demanda[];
  upsert: (d: Demanda) => void;
  mover: (id: string, status: Status) => void;
  remover: (id: string) => void;
  novoId: () => string;
};

const DataContext = createContext<Ctx | null>(null);

export function SentinelaProvider({ children }: { children: ReactNode }) {
  const [demandas, setDemandas] = useState<Demanda[]>(seed);

  const value = useMemo<Ctx>(
    () => ({
      demandas,
      novoId: () => Math.random().toString(36).slice(2, 9),
      upsert: (d) =>
        setDemandas((prev) =>
          prev.some((p) => p.id === d.id) ? prev.map((p) => (p.id === d.id ? d : p)) : [d, ...prev],
        ),
      mover: (id, status) =>
        setDemandas((prev) =>
          prev.map((p) =>
            p.id === id
              ? {
                  ...p,
                  status,
                  historico: [
                    ...p.historico,
                    {
                      data: new Date().toISOString().slice(0, 10),
                      autor: "Téo Buonora",
                      acao: `Movida para ${STATUS_LIST.find((s) => s.id === status)?.label}`,
                    },
                  ],
                }
              : p,
          ),
        ),
      remover: (id) => setDemandas((prev) => prev.filter((p) => p.id !== id)),
    }),
    [demandas],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useSentinela() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useSentinela precisa do SentinelaProvider");
  return ctx;
}
