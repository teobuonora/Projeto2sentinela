import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Lock, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import logo from "@/assets/sentinela-logo.png.asset.json";
import {
  MENSAGEM_CONTA_NAO_AUTORIZADA,
  MENSAGEM_GOOGLE_NAO_CADASTRADO,
  sanitizarDestinoPosLogin,
  usuarioPossuiPapelAutorizado,
  validarCredenciaisLogin,
  type MotivoBloqueioAcesso,
} from "@/lib/autenticacao-usuario";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AuthSearch {
  redirect?: string;
  motivo?: MotivoBloqueioAcesso;
}

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): AuthSearch => {
    const resultado: AuthSearch = {};
    if (typeof search["redirect"] === "string" && search["redirect"].trim()) {
      resultado.redirect = sanitizarDestinoPosLogin(search["redirect"]);
    }
    if (
      search["motivo"] === "autenticacao-necessaria" ||
      search["motivo"] === "acesso-nao-autorizado"
    ) {
      resultado.motivo = search["motivo"];
    }
    return resultado;
  },
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
  const search = Route.useSearch();
  const destinoPosLogin = sanitizarDestinoPosLogin(search.redirect);
  const bloqueadoSemLogin = search.motivo === "autenticacao-necessaria";
  const bloqueadoSemAutorizacao = search.motivo === "acesso-nao-autorizado";
  const [loading, setLoading] = useState(false);
  const [erroLogin, setErroLogin] = useState<string | null>(
    bloqueadoSemAutorizacao ? MENSAGEM_CONTA_NAO_AUTORIZADA : null,
  );
  const [modo, setModo] = useState<"entrar" | "registrar" | "esqueci">("entrar");

  async function verificarAutorizacao(userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    const papeis = error || !data ? [] : data.map((r) => r.role);
    if (!usuarioPossuiPapelAutorizado(papeis)) {
      await supabase.auth.signOut();
      setErroLogin(MENSAGEM_CONTA_NAO_AUTORIZADA);
      setModo("entrar");
      return false;
    }
    return true;
  }

  useEffect(() => {
    let ativo = true;

    async function validarERedirecionar(userId: string) {
      const autorizado = await verificarAutorizacao(userId);
      if (ativo && autorizado) {
        navigate({ href: destinoPosLogin, replace: true });
      }
    }

    supabase.auth.getUser().then(({ data }) => {
      if (ativo && data.user) void validarERedirecionar(data.user.id);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) void validarERedirecionar(session.user.id);
    });
    return () => {
      ativo = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate, destinoPosLogin]);

  async function entrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErroLogin(null);
    const f = new FormData(e.currentTarget);
    const validacao = validarCredenciaisLogin(String(f.get("email") ?? ""), String(f.get("senha") ?? ""));
    if (!validacao.valido) {
      setErroLogin(validacao.erro);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validacao.email,
      password: validacao.senha,
    });
    setLoading(false);
    if (error) {
      setErroLogin("E-mail ou senha incorretos, ou e-mail ainda não confirmado.");
      toast.error("Não foi possível entrar", { description: "Verifique suas credenciais e tente novamente." });
      return;
    }
    if (data.user) {
      const autorizado = await verificarAutorizacao(data.user.id);
      if (!autorizado) {
        toast.error("Acesso não autorizado", { description: MENSAGEM_CONTA_NAO_AUTORIZADA });
      }
    }
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
    if (data.session) {
      await supabase.auth.signOut();
    }
    toast.success("Conta criada!", {
      description: "Confirme seu e-mail e aguarde a autorização da equipe VISAT para acessar o sistema.",
    });
    setModo("entrar");
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
    setErroLogin(null);
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    setLoading(false);
    if (result.error) {
      setErroLogin(MENSAGEM_GOOGLE_NAO_CADASTRADO);
      toast.error("Não foi possível entrar com Google", { description: MENSAGEM_GOOGLE_NAO_CADASTRADO });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
        <div className="mb-6 flex flex-col items-center text-center">
          <img src={logo.url} alt="Sentinela" className="mb-3 h-14 w-auto" />
          <h1 className="font-display text-2xl font-semibold">Sentinela</h1>
          <p className="text-sm text-muted-foreground">Vigilância em Saúde do Trabalhador · VISAT</p>
        </div>

        {bloqueadoSemLogin && (
          <div
            role="status"
            className="mb-5 flex items-start gap-2.5 rounded-lg border border-primary/25 bg-primary/5 px-3.5 py-2.5 text-xs text-foreground"
          >
            <Lock className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>Acesso restrito a profissionais autorizados da VISAT. Faça login com seu e-mail e senha para continuar.</span>
          </div>
        )}

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
                {erroLogin && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive"
                  >
                    <AlertCircle className="mt-0.5 size-4 shrink-0" />
                    <span>{erroLogin}</span>
                  </div>
                )}
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
              <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
                <div className="h-px flex-1 bg-border" /> ou <div className="h-px flex-1 bg-border" />
              </div>
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={google}
                className="w-full gap-2.5 border-[#747775] bg-white px-3 text-sm font-medium text-[#1F1F1F] hover:bg-[#F2F2F2] hover:text-[#1F1F1F]"
              >
                <svg aria-hidden="true" className="size-[18px] shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
                  <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
                </svg>
                Entrar com Google
              </Button>
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
                <p className="text-xs text-muted-foreground">
                  Novas contas dependem de autorização da equipe VISAT para acessar o ambiente interno.
                </p>
                <Button type="submit" className="w-full" disabled={loading}>Criar conta</Button>
              </form>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
