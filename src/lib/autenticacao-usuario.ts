export interface UsuarioAutenticadoBasico {
  id: string;
  email?: string | null;
}

export type ResultadoAcessoRota<T extends UsuarioAutenticadoBasico> =
  | { permitido: true; usuario: T }
  | { permitido: false; redirecionarPara: "/auth"; destinoOriginal: string };

export type ResultadoValidacaoCredenciais =
  | { valido: true; email: string; senha: string }
  | { valido: false; erro: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
): ResultadoAcessoRota<T> {
  if (!usuario?.id) {
    return {
      permitido: false,
      redirecionarPara: "/auth",
      destinoOriginal: sanitizarDestinoPosLogin(destinoAtual),
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