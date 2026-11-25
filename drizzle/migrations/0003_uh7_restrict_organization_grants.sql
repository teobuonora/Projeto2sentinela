REVOKE ALL ON public.orgaos FROM anon;
REVOKE UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.orgaos FROM authenticated;
GRANT SELECT, INSERT ON public.orgaos TO authenticated;
