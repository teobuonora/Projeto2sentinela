CREATE POLICY "anexos_select_auth" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'anexos');
CREATE POLICY "anexos_insert_auth" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'anexos');
CREATE POLICY "anexos_delete_auth" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'anexos');