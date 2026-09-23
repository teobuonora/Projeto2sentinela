import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_authenticated/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações · Sentinela VISAT" },
      {
        name: "description",
        content:
          "Dados do servidor, alteração de senha com validação de segurança e preferências de notificações do Sentinela.",
      },
      { property: "og:title", content: "Configurações · Sentinela VISAT" },
      {
        property: "og:description",
        content: "Minha conta e preferências de alertas de prazos legais da VISAT.",
      },
    ],
  }),
  component: Configuracoes,
});

const regras = [
  { rotulo: "Mínimo de 8 caracteres", teste: (s: string) => s.length >= 8 },
  { rotulo: "Uma letra maiúscula", teste: (s: string) => /[A-Z]/.test(s) },
  { rotulo: "Um número", teste: (s: string) => /\d/.test(s) },
  { rotulo: "Um caractere especial", teste: (s: string) => /[^A-Za-z0-9]/.test(s) },
];

function Configuracoes() {
  const [nome, setNome] = useState("Téo Buonora Valença");
  const [email, setEmail] = useState("teo.valenca@visat.recife.pe.gov.br");
  const [senha, setSenha] = useState("");
  const [confirma, setConfirma] = useState("");
  const [prefs, setPrefs] = useState({
    email: true,
    prazo: true,
    novas: false,
    resumo: true,
  });

  const validas = regras.every((r) => r.teste(senha));

  return (
    <div className="space-y-5 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-semibold">Configurações</h1>
        <p className="text-sm text-muted-foreground">Minha conta e preferências do sistema.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="card-elevated border-border">
          <CardHeader>
            <CardTitle className="text-base">Perfil do servidor</CardTitle>
            <CardDescription>Informações exibidas nas movimentações e pareceres.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome completo</Label>
              <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail institucional</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cargo">Cargo</Label>
              <Input id="cargo" defaultValue="Inspetor de Vigilância em Saúde do Trabalhador" />
            </div>
            <Button onClick={() => toast.success("Perfil atualizado com sucesso")}>
              Salvar alterações
            </Button>
          </CardContent>
        </Card>

        <Card className="card-elevated border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldCheck className="size-4 text-primary" />
              Alteração de senha
            </CardTitle>
            <CardDescription>Requisitos mínimos de segurança institucional.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="atual">Senha atual</Label>
              <Input id="atual" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nova">Nova senha</Label>
              <Input
                id="nova"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="conf">Confirmar nova senha</Label>
              <Input
                id="conf"
                type="password"
                value={confirma}
                onChange={(e) => setConfirma(e.target.value)}
              />
            </div>
            <ul className="space-y-1 text-sm">
              {regras.map((r) => {
                const ok = r.teste(senha);
                return (
                  <li key={r.rotulo} className={ok ? "text-success" : "text-muted-foreground"}>
                    {ok ? "✓" : "•"} {r.rotulo}
                  </li>
                );
              })}
              <li
                className={
                  confirma && senha === confirma ? "text-success" : "text-muted-foreground"
                }
              >
                {confirma && senha === confirma ? "✓" : "•"} As senhas coincidem
              </li>
            </ul>
            <Button
              disabled={!validas || senha !== confirma}
              onClick={() => {
                toast.success("Senha alterada com sucesso");
                setSenha("");
                setConfirma("");
              }}
            >
              Alterar senha
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="card-elevated border-border">
        <CardHeader>
          <CardTitle className="text-base">Preferências de notificações e alertas</CardTitle>
          <CardDescription>Defina como o Sentinela avisa sobre prazos legais.</CardDescription>
        </CardHeader>
        <CardContent className="divide-y divide-border">
          {[
            {
              key: "email" as const,
              titulo: "Notificações por e-mail",
              desc: "Receber avisos no e-mail institucional.",
            },
            {
              key: "prazo" as const,
              titulo: "Alerta de prazo crítico",
              desc: "Aviso quando faltarem 5 dias ou menos para o vencimento.",
            },
            {
              key: "novas" as const,
              titulo: "Novas demandas atribuídas",
              desc: "Aviso imediato ao ser designado responsável.",
            },
            {
              key: "resumo" as const,
              titulo: "Resumo semanal da equipe",
              desc: "Relatório de carga de trabalho toda segunda-feira.",
            },
          ].map((p) => (
            <div key={p.key} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="text-sm font-medium">{p.titulo}</p>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
              <Switch
                checked={prefs[p.key]}
                onCheckedChange={(v) => {
                  setPrefs((s) => ({ ...s, [p.key]: v }));
                  toast.success(`${p.titulo}: ${v ? "ativado" : "desativado"}`);
                }}
              />
            </div>
          ))}
          <Separator className="hidden" />
        </CardContent>
      </Card>
    </div>
  );
}
