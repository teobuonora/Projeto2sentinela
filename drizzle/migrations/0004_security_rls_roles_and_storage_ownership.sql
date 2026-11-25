CREATE TYPE public.app_role AS ENUM ('admin', 'inspetor');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

REVOKE ALL ON public.user_roles FROM anon;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'inspetor'::public.app_role
FROM auth.users
WHERE id IN (
  '11c518cb-182b-4c67-97c2-d4ddb078e6a8',
  '5c10b9f4-a710-4073-948d-086bc86d190e',
  'e2f15fc4-c691-4112-bd70-afe1e98c7372',
  '85a17f0c-32d6-4a3a-98f7-f2b22b6b5bd8',
  '019776a0-9f17-4fe1-90a4-278accc4ee3f',
  'a15c8726-8377-4850-91ef-a93194a4209c',
  '9f5f41da-64a3-4b13-a68c-fac1c66aa7b2',
  '556c2b4a-415d-4e24-9ca7-802fddfb16cd'
)
ON CONFLICT (user_id, role) DO NOTHING;

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE id = '11c518cb-182b-4c67-97c2-d4ddb078e6a8'
ON CONFLICT (user_id, role) DO NOTHING;

DROP POLICY IF EXISTS "auth read" ON public.demandas;
DROP POLICY IF EXISTS "auth insert" ON public.demandas;
DROP POLICY IF EXISTS "auth update" ON public.demandas;
DROP POLICY IF EXISTS "auth delete" ON public.demandas;

CREATE POLICY "VISAT staff read demandas"
  ON public.demandas
  FOR SELECT
  TO authenticated
  USING (public.has_role((SELECT auth.uid()), 'inspetor') OR public.has_role((SELECT auth.uid()), 'admin'));

CREATE POLICY "VISAT staff insert demandas"
  ON public.demandas
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role((SELECT auth.uid()), 'inspetor') OR public.has_role((SELECT auth.uid()), 'admin'));

CREATE POLICY "VISAT staff update demandas"
  ON public.demandas
  FOR UPDATE
  TO authenticated
  USING (public.has_role((SELECT auth.uid()), 'inspetor') OR public.has_role((SELECT auth.uid()), 'admin'))
  WITH CHECK (public.has_role((SELECT auth.uid()), 'inspetor') OR public.has_role((SELECT auth.uid()), 'admin'));

CREATE POLICY "VISAT staff delete demandas"
  ON public.demandas
  FOR DELETE
  TO authenticated
  USING (public.has_role((SELECT auth.uid()), 'inspetor') OR public.has_role((SELECT auth.uid()), 'admin'));

DROP POLICY IF EXISTS "Authenticated users read organizations" ON public.orgaos;
DROP POLICY IF EXISTS "Authenticated users register organizations" ON public.orgaos;

CREATE POLICY "VISAT staff read organizations"
  ON public.orgaos
  FOR SELECT
  TO authenticated
  USING (public.has_role((SELECT auth.uid()), 'inspetor') OR public.has_role((SELECT auth.uid()), 'admin'));

CREATE POLICY "VISAT staff register organizations"
  ON public.orgaos
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role((SELECT auth.uid()), 'inspetor') OR public.has_role((SELECT auth.uid()), 'admin'));

DROP POLICY IF EXISTS "anexos_select_auth" ON storage.objects;
DROP POLICY IF EXISTS "anexos_insert_auth" ON storage.objects;
DROP POLICY IF EXISTS "anexos_delete_auth" ON storage.objects;

CREATE POLICY "anexos_select_owner"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'anexos'
    AND owner_id = (SELECT auth.uid()::text)
    AND (public.has_role((SELECT auth.uid()), 'inspetor') OR public.has_role((SELECT auth.uid()), 'admin'))
  );

CREATE POLICY "anexos_insert_owner"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'anexos'
    AND owner_id = (SELECT auth.uid()::text)
    AND (public.has_role((SELECT auth.uid()), 'inspetor') OR public.has_role((SELECT auth.uid()), 'admin'))
  );

CREATE POLICY "anexos_delete_owner"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'anexos'
    AND owner_id = (SELECT auth.uid()::text)
    AND (public.has_role((SELECT auth.uid()), 'inspetor') OR public.has_role((SELECT auth.uid()), 'admin'))
  );