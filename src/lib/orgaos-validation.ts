export function normalizarNomeOrgao(nome: string): string {
  return nome.replace(/\s+/g, " ").trim();
}

export function validarNomeOrgao(nome: string, existentes: readonly string[]): string | null {
  const normalizado = normalizarNomeOrgao(nome);
  if (!normalizado) return "Informe o nome do órgão solicitante.";
  if (existentes.some((item) => normalizarNomeOrgao(item).toLowerCase() === normalizado.toLowerCase())) {
    return "Este órgão solicitante já está cadastrado.";
  }
  return null;
}