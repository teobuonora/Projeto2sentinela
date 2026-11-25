CREATE OR REPLACE FUNCTION public.bloquear_cadastro_automatico_oauth()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_provider text;
BEGIN
  v_provider := COALESCE(NEW.raw_app_meta_data->>'provider', 'email');
  IF v_provider <> 'email' THEN
    RAISE EXCEPTION 'Cadastro automático via provedor externo (%) não permitido. Utilize Criar conta ou aguarde autorização da equipe VISAT.', v_provider
      USING ERRCODE = '42501';
  END IF;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.bloquear_cadastro_automatico_oauth() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS trg_bloquear_cadastro_automatico_oauth ON auth.users;
CREATE TRIGGER trg_bloquear_cadastro_automatico_oauth
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.bloquear_cadastro_automatico_oauth();