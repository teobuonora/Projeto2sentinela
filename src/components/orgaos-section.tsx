import { useState, type FormEvent } from "react";
import { Building2, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOrgaos } from "@/lib/orgaos";
import { validarNomeOrgao } from "@/lib/orgaos-validation";

export function OrgaosSection() {
  const { data: orgaos = [], isPending, isError, refetch, cadastrar, cadastrando } = useOrgaos();
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  async function salvar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validacao = validarNomeOrgao(nome, orgaos.map((orgao) => orgao.nome));
    setErro(validacao);
    if (validacao) return;
    try {
      await cadastrar(nome);
      setNome("");
      toast.success("Órgão solicitante cadastrado com sucesso");
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Não foi possível cadastrar o órgão.");
    }
  }

  return (
    <section aria-labelledby="orgaos-titulo" className="space-y-4 border-t border-border pt-5">
      <h2 id="orgaos-titulo" className="flex items-center gap-2 text-base font-semibold">
        <Building2 className="size-4 text-primary" /> Órgãos solicitantes
      </h2>
      <form onSubmit={salvar} noValidate className="space-y-2">
        <Label htmlFor="novo-orgao">Nome do órgão solicitante</Label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <Input id="novo-orgao" value={nome} placeholder="Ex.: Ministério do Trabalho e Emprego"
            disabled={cadastrando} aria-invalid={Boolean(erro)} aria-describedby={erro ? "orgao-erro" : undefined}
            onChange={(event) => { setNome(event.target.value); setErro(null); }} />
          <Button type="submit" disabled={isPending || isError || cadastrando} className="shrink-0">
            <Plus className="size-4" /> {cadastrando ? "Cadastrando..." : "Cadastrar órgão"}
          </Button>
        </div>
        {erro && <p id="orgao-erro" role="alert" className="text-sm text-danger">{erro}</p>}
      </form>
      {isPending ? <p role="status" className="text-sm text-muted-foreground">Carregando órgãos...</p>
        : isError ? <div className="flex flex-wrap items-center gap-3">
          <p role="alert" className="text-sm text-danger">Não foi possível carregar os órgãos solicitantes.</p>
          <Button variant="outline" onClick={() => void refetch()}>Tentar novamente</Button>
        </div>
        : orgaos.length === 0 ? <p className="text-sm text-muted-foreground">Nenhum órgão cadastrado.</p>
        : <ul aria-label="Órgãos cadastrados" className="grid gap-x-6 divide-y divide-border sm:grid-cols-2">
          {orgaos.map((orgao) => <li key={orgao.id} className="flex min-w-0 items-center gap-2 py-3 text-sm">
            <Building2 className="size-4 shrink-0 text-muted-foreground" />
            <span className="break-words [overflow-wrap:anywhere]">{orgao.nome}</span>
          </li>)}
        </ul>}
    </section>
  );
}