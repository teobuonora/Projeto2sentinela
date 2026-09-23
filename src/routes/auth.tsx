import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import logo from "@/assets/sentinela-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar · Sentinela VISAT" },
      { name: "description", content: "Acesse o Sentinela, sistema interno de gestão de demandas da VISAT." },
      { property: "og:title", content: "Entrar · Sentinela VISAT" },
      { property: "og:description", content: "Acesse o Sentinela, sistema interno de gestão de demandas da VISAT." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [modo, setModo] = useState<"entrar" | "registrar" | "esqueci">("entrar");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/", replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) navigate({ to: "/", replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function entrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(f.get("email")),
      password: String(f.get("senha")),
    });
    setLoading(false);
    if (error) toast.error("Não foi possível entrar", { description: "E-mail ou senha incorretos, ou e-mail não confirmado." });
  }

  async function registrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const senha = String(f.get("senha"));
    if (senha.length < 8) { toast.error("A senha deve ter ao menos 8 caracteres."); return; }
    if (senha !== String(f.get("confirmar"))) { toast.error("As senhas não coincidem."); return; }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: String(f.get("email")),
      password: senha,
      options: { emailRedirectTo: window.location.origin, data: { full_name: String(f.get("nome")) } },
    });
    setLoading(false);
    if (error) { toast.error("Não foi possível criar a conta", { description: error.message }); return; }
    if (!data.session) {
      toast.success("Conta criada!", { description: "Enviamos um link de confirmação para o seu e-mail." });
      setModo("entrar");
    }
  }

  async function esqueci(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setLoading(true);
    await supabase.auth.resetPasswordForEmail(String(f.get("email")), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    toast.success("Verifique seu e-mail", { description: "Se a conta existir, enviamos um link para redefinir a senha." });
    setModo("entrar");
  }

  async function google() {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) toast.error("Falha ao entrar com Google");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
        <div className="mb-6 flex flex-col items-center text-center">
          <img src={logo.url} alt="Sentinela" className="mb-3 h-14 w-auto" />
          <h1 className="font-display text-2xl font-semibold">Sentinela</h1>
          <p className="text-sm text-muted-foreground">Vigilância em Saúde do Trabalhador · VISAT</p>
        </div>

        {modo === "esqueci" ? (
          <form onSubmit={esqueci} className="space-y-4">
            <p className="text-sm text-muted-foreground">Informe seu e-mail para receber o link de redefinição.</p>
            <div className="space-y-2">
              <Label htmlFor="email-r">E-mail</Label>
              <Input id="email-r" name="email" type="email" required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>Enviar link</Button>
            <Button type="button" variant="ghost" className="w-full" onClick={() => setModo("entrar")}>Voltar</Button>
          </form>
        ) : (
          <Tabs value={modo} onValueChange={(v) => setModo(v as "entrar" | "registrar")}>
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="entrar">Entrar</TabsTrigger>
              <TabsTrigger value="registrar">Criar conta</TabsTrigger>
            </TabsList>
            <TabsContent value="entrar">
              <form onSubmit={entrar} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" name="email" type="email" autoComplete="email" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="senha">Senha</Label>
                    <button type="button" className="text-xs text-primary hover:underline" onClick={() => setModo("esqueci")}>
                      Esqueci a senha
                    </button>
                  </div>
                  <Input id="senha" name="senha" type="password" autoComplete="current-password" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>Entrar</Button>
              </form>
            </TabsContent>
            <TabsContent value="registrar">
              <form onSubmit={registrar} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome completo</Label>
                  <Input id="nome" name="nome" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-c">E-mail</Label>
                  <Input id="email-c" name="email" type="email" autoComplete="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senha-c">Senha</Label>
                  <Input id="senha-c" name="senha" type="password" autoComplete="new-password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmar">Confirmar senha</Label>
                  <Input id="confirmar" name="confirmar" type="password" autoComplete="new-password" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>Criar conta</Button>
              </form>
            </TabsContent>
            <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="h-px flex-1 bg-border" /> ou <div className="h-px flex-1 bg-border" />
            </div>
            <Button type="button" variant="outline" className="w-full" onClick={google}>
              Continuar com Google
            </Button>
          </Tabs>
        )}
      </div>
    </div>
  );
}
