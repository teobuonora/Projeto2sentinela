ALTER TABLE public.demandas
  ADD COLUMN IF NOT EXISTS data_encerramento date;

UPDATE public.demandas
SET data_encerramento = COALESCE(
  NULLIF(historico -> (jsonb_array_length(historico) - 1) ->> 'data', '')::date,
  updated_at::date
)
WHERE status = 'concluidas'
  AND data_encerramento IS NULL;