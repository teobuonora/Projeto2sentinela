export const PAPEIS_AUTORIZADOS = ["admin", "inspetor"] as const;
export type PapelAutorizado = (typeof PAPEIS_AUTORIZADOS)[number];

export type MotivoBloqueioAcesso = "autenticacao-necessaria" | "acesso-nao-autorizado";

export const MENSAGEM_CONTA_NAO_AUTORIZADA =
  "Esta conta ainda não está autorizada a acessar o Sentinela. Solicite liberação à equipe da VISAT.";

export const MENSAGEM_GOOGLE_NAO_CADASTRADO =
  "Apenas contas previamente cadastradas e autorizadas podem entrar com Google. Para solicitar acesso, utilize a aba Criar conta.";

export interface UsuarioAutenticadoBasico {
  id: string;
  email?: string | null;
}

export type ResultadoAcessoRota<T extends UsuarioAutenticadoBasico> =
  | { permitido: true; usuario: T }
  | { permitido: false; redirecionarPara: "/auth"; destinoOriginal: string; motivo: MotivoBloqueioAcesso };

export type ResultadoValidacaoCredenciais =
  | { valido: true; email: string; senha: string }
  | { valido: false; erro: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function usuarioPossuiPapelAutorizado(papeis: readonly string[] | null | undefined): boolean {
  if (!papeis || papeis.length === 0) return false;
  return papeis.some((papel) => (PAPEIS_AUTORIZADOS as readonly string[]).includes(papel));
}

export function sanitizarDestinoPosLogin(destino: unknown): string {
  if (typeof destino !== "string") return "/";
  const limpo = destino.trim();
  if (!limpo.startsWith("/") || limpo.startsWith("//") || /[\\\u0000-\u001f\u007f]/.test(limpo)) {
    return "/";
  }
  try {
    const origem = "https://sentinela.invalid";
    const url = new URL(limpo, origem);
    if (url.origin !== origem || url.pathname.startsWith("//")) return "/";
    if (url.pathname === "/auth" || url.pathname === "/reset-password") return "/";
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}

export function avaliarAcessoRotaProtegida<T extends UsuarioAutenticadoBasico>(
  usuario: T | null | undefined,
  destinoAtual: string,
  papeis?: readonly string[] | null,
): ResultadoAcessoRota<T> {
  if (!usuario?.id) {
    return {
      permitido: false,
      redirecionarPara: "/auth",
      destinoOriginal: sanitizarDestinoPosLogin(destinoAtual),
      motivo: "autenticacao-necessaria",
    };
  }
  if (!usuarioPossuiPapelAutorizado(papeis)) {
    return {
      permitido: false,
      redirecionarPara: "/auth",
      destinoOriginal: sanitizarDestinoPosLogin(destinoAtual),
      motivo: "acesso-nao-autorizado",
    };
  }
  return { permitido: true, usuario };
}

export function validarCredenciaisLogin(email: string, senha: string): ResultadoValidacaoCredenciais {
  const emailNormalizado = email.trim().toLowerCase();
  if (!emailNormalizado || !EMAIL_REGEX.test(emailNormalizado)) {
    return { valido: false, erro: "Informe um e-mail institucional válido." };
  }
  if (!senha || senha.trim().length === 0) {
    return { valido: false, erro: "Informe sua senha para entrar." };
  }
  return { valido: true, email: emailNormalizado, senha };
}