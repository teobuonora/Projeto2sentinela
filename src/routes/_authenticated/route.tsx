import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AppSidebar } from "@/components/app-sidebar";
import { avaliarAcessoRotaProtegida } from "@/lib/autenticacao-usuario";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SentinelaProvider } from "@/lib/sentinela-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const { data, error } = await supabase.auth.getUser();
    const usuario = error ? null : data.user;
    let papeis: string[] = [];

    if (usuario?.id) {
      const { data: rolesData, error: rolesError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", usuario.id);
      if (!rolesError && rolesData) {
        papeis = rolesData.map((r) => r.role);
      }
    }

    const decisao = avaliarAcessoRotaProtegida(usuario, location.href, papeis);
    if (!decisao.permitido) {
      if (decisao.motivo === "acesso-nao-autorizado") {
        await supabase.auth.signOut();
      }
      throw redirect({
        to: "/auth",
        search: {
          redirect: decisao.destinoOriginal,
          motivo: decisao.motivo,
        },
      });
    }
    return { user: decisao.usuario };
  },
  component: AppShell,
});

function AppShell() {
  const { user } = Route.useRouteContext();
  const nome =
    (user.user_metadata?.['full_name'] as string | undefined) ||
    (user.user_metadata?.['name'] as string | undefined) ||
    user.email?.split("@")[0] ||
    "Servidor";
  const iniciais = nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <SentinelaProvider usuarioAtual={nome}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-card/90 px-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <div className="hidden sm:block">
                  <p className="font-display text-sm font-semibold">
                    Secretaria Executiva de Vigilância em Saúde do Trabalhador
                  </p>
                  <p className="text-xs text-muted-foreground">Recife · Pernambuco</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-medium">{nome}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Avatar className="size-9 border border-border">
                  <AvatarFallback className="bg-primary text-primary-foreground">{iniciais}</AvatarFallback>
                </Avatar>
              </div>
            </header>
            <main className="min-w-0 flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </SentinelaProvider>
  );
}
