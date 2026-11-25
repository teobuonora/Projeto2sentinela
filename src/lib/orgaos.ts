import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { normalizarNomeOrgao, validarNomeOrgao } from "./orgaos-validation";

export const orgaosQueryOptions = queryOptions({
  queryKey: ["orgaos"],
  queryFn: async () => {
    const { data, error } = await supabase.from("orgaos").select("id,nome").order("nome");
    if (error) throw error;
    return data;
  },
});

export function useOrgaos() {
  const queryClient = useQueryClient();
  const consulta = useQuery(orgaosQueryOptions);
  const cadastro = useMutation({
    mutationFn: async (nome: string) => {
      const erro = validarNomeOrgao(nome, (consulta.data ?? []).map((orgao) => orgao.nome));
      if (erro) throw new Error(erro);
      const { data, error } = await supabase.from("orgaos")
        .insert({ nome: normalizarNomeOrgao(nome) }).select("id,nome").single();
      if (error) {
        if (error.code === "23505") throw new Error("Este órgão solicitante já está cadastrado.");
        throw new Error("Não foi possível cadastrar o órgão. Tente novamente.");
      }
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: orgaosQueryOptions.queryKey });
    },
  });
  return { ...consulta, cadastrar: cadastro.mutateAsync, cadastrando: cadastro.isPending };
}