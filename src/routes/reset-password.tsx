import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Redefinir senha · Sentinela VISAT" },
      { name: "description", content: "Defina uma nova senha de acesso ao Sentinela." },
      { property: "og:title", content: "Redefinir senha · Sentinela VISAT" },
      { property: "og:description", content: "Defina uma nova senha de acesso ao Sentinela." },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const senha = String(f.get("senha"));
    if (senha.length < 8) { toast.error("A senha deve ter ao menos 8 caracteres."); return; }
    if (senha !== String(f.get("confirmar"))) { toast.error("As senhas não coincidem."); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: senha });
    setLoading(false);
    if (error) { toast.error("Não foi possível alterar a senha", { description: error.message }); return; }
    toast.success("Senha alterada com sucesso!");
    navigate({ to: "/", replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-2xl border border-border bg-card p-8 shadow-lg">
        <h1 className="font-display text-xl font-semibold">Nova senha</h1>
        <div className="space-y-2">
          <Label htmlFor="senha">Nova senha</Label>
          <Input id="senha" name="senha" type="password" autoComplete="new-password" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmar">Confirmar senha</Label>
          <Input id="confirmar" name="confirmar" type="password" autoComplete="new-password" required />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>Salvar nova senha</Button>
      </form>
    </div>
  );
}
