CREATE TABLE public.demandas (
  id text PRIMARY KEY,
  protocolo text NOT NULL,
  orgao text NOT NULL,
  inspetor text NOT NULL,
  prazo date NOT NULL,
  status text NOT NULL DEFAULT 'recebidas',
  assunto text NOT NULL DEFAULT '',
  parecer text NOT NULL DEFAULT '',
  anexos jsonb NOT NULL DEFAULT '[]'::jsonb,
  historico jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.demandas TO authenticated;
GRANT ALL ON public.demandas TO service_role;
ALTER TABLE public.demandas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth read" ON public.demandas FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth insert" ON public.demandas FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth update" ON public.demandas FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth delete" ON public.demandas FOR DELETE TO authenticated USING (true);
ALTER PUBLICATION supabase_realtime ADD TABLE public.demandas;

INSERT INTO public.demandas (id, protocolo, orgao, inspetor, prazo, status, assunto, parecer, anexos, historico) VALUES
('1','VISAT-2026-00841','MPT','João Furtado',current_date-3,'analise','Inquérito civil - frigorífico zona oeste','Aguardando relatório de inspeção in loco realizado em 12/09.','["oficio-mpt-841.pdf"]', jsonb_build_array(jsonb_build_object('data',(current_date-12)::text,'autor','Sistema','acao','Demanda recebida do MPT'),jsonb_build_object('data',(current_date-9)::text,'autor','João Furtado','acao','Movida para Em Análise'))),
('2','VISAT-2026-00857','TRT','Rafael Lins',current_date,'atendimento','Perícia de insalubridade - construção civil','Parecer técnico em redação final.','["laudo-preliminar.pdf","planilha-medicoes.csv"]', jsonb_build_array(jsonb_build_object('data',(current_date-8)::text,'autor','Sistema','acao','Demanda recebida do TRT'))),
('3','VISAT-2026-00862','Sindicato','Téo Buonora',current_date+4,'recebidas','Denúncia de exposição a agentes químicos','','[]', jsonb_build_array(jsonb_build_object('data',(current_date-1)::text,'autor','Sistema','acao','Demanda recebida do Sindicato'))),
('4','VISAT-2026-00863','CEREST','Marina Tavares',current_date+12,'recebidas','Investigação de acidente de trabalho grave','','[]', jsonb_build_array(jsonb_build_object('data',(current_date-1)::text,'autor','Sistema','acao','Demanda recebida do CEREST'))),
('5','VISAT-2026-00799','MPT','Téo Buonora',current_date+9,'atendimento','Termo de ajustamento de conduta - call center','Vistoria agendada com a empresa para a próxima semana.','["tac-visat.pdf"]', jsonb_build_array(jsonb_build_object('data',(current_date-20)::text,'autor','Sistema','acao','Demanda recebida do MPT'))),
('6','VISAT-2026-00770','Defensoria Pública','Carla Meneses',current_date+2,'analise','Condições ergonômicas em central de distribuição','Solicitada documentação complementar ao empregador.','[]', jsonb_build_array(jsonb_build_object('data',(current_date-15)::text,'autor','Sistema','acao','Demanda recebida da Defensoria'))),
('7','VISAT-2026-00712','TRT','João Furtado',current_date-25,'concluidas','Laudo de ruído - metalúrgica','Retorno institucional enviado ao TRT em tempo hábil.','["relatorio-final.pdf"]', jsonb_build_array(jsonb_build_object('data',(current_date-30)::text,'autor','João Furtado','acao','Retorno institucional registrado'))),
('8','VISAT-2026-00689','Sindicato','Rafael Lins',current_date-40,'concluidas','Fiscalização de EPIs em cooperativa','Demanda concluída e arquivada.','[]', jsonb_build_array(jsonb_build_object('data',(current_date-42)::text,'autor','Rafael Lins','acao','Concluída'))),
('9','VISAT-2026-00866','MPT','Marina Tavares',current_date+6,'analise','Trabalho em altura - rede de supermercados','','[]', jsonb_build_array(jsonb_build_object('data',(current_date-2)::text,'autor','Sistema','acao','Demanda recebida do MPT'))),
('10','VISAT-2026-00868','Ministério Público Estadual','Carla Meneses',current_date+1,'recebidas','Assédio moral organizacional - órgão público','','[]', jsonb_build_array(jsonb_build_object('data',current_date::text,'autor','Sistema','acao','Demanda recebida do MPE')));