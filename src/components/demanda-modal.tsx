import { useEffect, useState } from "react";
import { Archive, FileUp, Send, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  INSPETORES,
  ORGAOS,
  STATUS_LIST,
  formatarData,
  useSentinela,
  type Demanda,
  type Status,
} from "@/lib/sentinela-data";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  demanda: Demanda | null;
};

const vazia = (id: string): Demanda => ({
  id,
  protocolo: "",
  orgao: "",
  inspetor: "",
  prazo: new Date().toISOString().slice(0, 10),
  status: "recebidas",
  assunto: "",
  parecer: "",
  anexos: [],
  historico: [],
});

export function DemandaModal({ open, onOpenChange, demanda }: Props) {
  const { upsert, remover, novoId } = useSentinela();
  const [form, setForm] = useState<Demanda>(vazia("novo"));

  useEffect(() => {
    if (open) setForm(demanda ? { ...demanda } : vazia(novoId()));
  }, [open, demanda, novoId]);

  const set = <K extends keyof Demanda>(k: K, v: Demanda[K]) => setForm((f) => ({ ...f, [k]: v }));

  const salvar = () => {
    if (!form.protocolo || !form.orgao || !form.inspetor) {
      toast.error("Preencha protocolo, órgão solicitante e inspetor responsável.");
      return;
    }
    upsert({
      ...form,
      historico: [
        ...form.historico,
        {
          data: new Date().toISOString().slice(0, 10),
          autor: "Téo Buonora",
          acao: demanda ? "Demanda atualizada" : "Demanda cadastrada",
        },
      ],
    });
    toast.success(demanda ? "Demanda atualizada" : "Demanda cadastrada", {
      description: `Protocolo ${form.protocolo}`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">
            {demanda ? `Demanda ${demanda.protocolo}` : "Nova demanda"}
          </DialogTitle>
          <DialogDescription>
            Registro de demanda externa recebida pela Vigilância em Saúde do Trabalhador.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Órgão solicitante</Label>
            <Select value={form.orgao} onValueChange={(v) => set("orgao", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o órgão" />
              </SelectTrigger>
              <SelectContent>
                {ORGAOS.map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="protocolo">Número do protocolo</Label>
            <Input
              id="protocolo"
              value={form.protocolo}
              placeholder="VISAT-2026-00000"
              onChange={(e) => set("protocolo", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Inspetor responsável</Label>
            <Select value={form.inspetor} onValueChange={(v) => set("inspetor", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o inspetor" />
              </SelectTrigger>
              <SelectContent>
                {INSPETORES.map((i) => (
                  <SelectItem key={i} value={i}>
                    {i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prazo">Prazo legal</Label>
            <Input
              id="prazo"
              type="date"
              value={form.prazo}
              onChange={(e) => set("prazo", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Status do fluxo</Label>
            <Select value={form.status} onValueChange={(v) => set("status", v as Status)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_LIST.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assunto">Assunto</Label>
            <Input
              id="assunto"
              value={form.assunto}
              placeholder="Resumo da demanda"
              onChange={(e) => set("assunto", e.target.value)}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="parecer">Inserção de pareceres</Label>
            <Textarea
              id="parecer"
              rows={4}
              value={form.parecer}
              placeholder="Registre o parecer técnico da inspeção..."
              onChange={(e) => set("parecer", e.target.value)}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label>Relatórios técnicos (PDF/CSV)</Label>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-input bg-muted/40 px-4 py-6 text-center transition-colors hover:bg-muted">
              <FileUp className="size-5 text-muted-foreground" />
              <span className="text-sm font-medium">Clique para anexar arquivos</span>
              <span className="text-xs text-muted-foreground">PDF ou CSV até 20 MB</span>
              <input
                type="file"
                multiple
                accept=".pdf,.csv"
                className="hidden"
                onChange={(e) => {
                  const nomes = Array.from(e.target.files ?? []).map((f) => f.name);
                  if (nomes.length) {
                    set("anexos", [...form.anexos, ...nomes]);
                    toast.success(`${nomes.length} arquivo(s) anexado(s)`);
                  }
                }}
              />
            </label>
            {form.anexos.length > 0 && (
              <ul className="space-y-1">
                {form.anexos.map((a) => (
                  <li
                    key={a}
                    className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-1.5 text-sm"
                  >
                    <span className="truncate">{a}</span>
                    <button
                      type="button"
                      className="text-muted-foreground transition-colors hover:text-danger"
                      onClick={() => set("anexos", form.anexos.filter((x) => x !== a))}
                    >
                      <X className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {demanda && demanda.historico.length > 0 && (
          <div className="rounded-lg border border-border bg-muted/40 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Histórico de movimentação
            </p>
            <ul className="space-y-1 text-sm">
              {demanda.historico.map((h, i) => (
                <li key={i} className="flex gap-2 text-muted-foreground">
                  <span className="tabular-nums">{formatarData(h.data)}</span>
                  <span className="text-foreground">{h.acao}</span>
                  <span>· {h.autor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => {
                toast.success("Retorno institucional registrado", {
                  description: `Ofício de resposta gerado para ${form.orgao || "o órgão solicitante"}.`,
                });
                upsert({
                  ...form,
                  status: "concluidas",
                  historico: [
                    ...form.historico,
                    {
                      data: new Date().toISOString().slice(0, 10),
                      autor: "Téo Buonora",
                      acao: "Retorno institucional registrado",
                    },
                  ],
                });
                onOpenChange(false);
              }}
            >
              <Send className="size-4" />
              Registrar retorno institucional
            </Button>
            <Button
              variant="ghost"
              className="text-danger hover:bg-danger-soft hover:text-danger"
              onClick={() => {
                if (demanda) remover(demanda.id);
                toast.warning("Demanda arquivada como inválida");
                onOpenChange(false);
              }}
            >
              <Archive className="size-4" />
              Arquivar demanda inválida
            </Button>
          </div>
          <Button onClick={salvar}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
