CREATE TABLE public.orgaos (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 nome text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT orgaos_nome_valido CHECK (nome = btrim(regexp_replace(nome, '[[:space:]]+', ' ', 'g')) AND length(nome) > 0)
);
GRANT SELECT, INSERT ON public.orgaos TO authenticated;
GRANT ALL ON public.orgaos TO service_role;
ALTER TABLE public.orgaos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users read organizations" ON public.orgaos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users register organizations" ON public.orgaos FOR INSERT TO authenticated WITH CHECK (true);
CREATE UNIQUE INDEX orgaos_nome_unique ON public.orgaos (lower(nome));
INSERT INTO public.orgaos (nome)
SELECT DISTINCT ON (lower(nome)) nome FROM (
 SELECT btrim(regexp_replace(orgao, '[[:space:]]+', ' ', 'g')) AS nome FROM public.demandas
 UNION ALL SELECT unnest(ARRAY['MPT','TRT','Sindicato','Ministério Público Estadual','CEREST','Defensoria Pública'])
) AS existentes WHERE nome <> '' ORDER BY lower(nome), nome;
