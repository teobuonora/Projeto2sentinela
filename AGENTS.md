<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Requesting organizations use `public.orgaos` and the shared React Query module `src/lib/orgaos.ts`; keep `demandas.orgao` as its existing text value to preserve historical demands and reports.
- Organization registration permits only authenticated SELECT/INSERT, with database-enforced normalized nonempty and case-insensitive unique names; no admin role, UPDATE, DELETE, or anonymous grants are needed for UH7.
