# Sentinela Dashboard

Por favor, crie um protótipo funcional e profissional para uma aplicação web chamada "Sentinela". 

[Vou anexar a logo do projeto/VISAT nesta mensagem para você usar na barra de navegação superior].

**Contexto da Organização e do Produto:**

Este é um sistema interno desenvolvido especificamente para a organização VISAT (Secretaria Executiva de Vigilância em Saúde do Trabalhador). O "Sentinela" tem o objetivo de modernizar a gestão interna da VISAT, centralizando o recebimento de demandas de órgãos de controle externos (como MPT, TRT e Sindicatos). A ferramenta é essencial para organizar o fluxo de trabalho dos inspetores da VISAT, rastrear a carga de trabalho, evitar a perda de prazos legais e substituir totalmente o uso de planilhas manuais.

**Estilo Visual e UI/UX:**

- Design corporativo, moderno, limpo e polido (estilo painel administrativo/SaaS), transmitindo a seriedade da VISAT.

- Cores: Use uma paleta profissional focada na identidade da VISAT (tons de azul institucional, cinza claro para fundos e branco para os cartões de tarefas). Use cores semânticas para os alertas de prazos (vermelho para atrasado/vencendo hoje, amarelo para atenção, verde para no prazo).

- Navegação lateral (Sidebar) expansível contendo os seguintes menus: Dashboard, Demandas (Kanban), Relatórios, Configurações e Sair.

**Telas e Componentes Principais que preciso no protótipo:**

1. **Dashboard (Visão Geral da VISAT):**

   - Resumo em tempo real com cards de métricas gerenciais: "Demandas Ativas", "Prazos Próximos do Vencimento" e "Carga de Trabalho por Inspetor".

   - Uma barra de busca rápida no topo para pesquisar diretamente por "Número de Protocolo".

2. **Quadro Visual Interativo (Kanban) - O Coração do Sistema:**

   - Colunas do Kanban simulando o fluxo da VISAT: "Recebidas", "Em Análise", "Em Atendimento" e "Concluídas".

   - Os cartões (cards) das demandas devem exibir: Número do Protocolo, Órgão Solicitante, Inspetor Responsável da VISAT, e uma tag de Prazo (com alerta visual de cor).

   - Deve ser possível arrastar e soltar (drag and drop) os cartões entre as colunas para atualizar o status.

   - Filtros no topo do Kanban: Filtrar por "Órgão Solicitante", "Inspetor Responsável" e "Status".

   - Um botão principal destacado: "+ Nova Demanda".

3. **Modal de Cadastro/Edição de Demanda:**

   - Ao clicar em "+ Nova Demanda" ou ao clicar em um card existente, abrir um modal polido contendo:

   - Campos de formulário: Órgão Solicitante (Select dropdown), Número do Protocolo, Inspetor Responsável (Select), Prazo (Datepicker).

   - Área de texto para "Inserção de Pareceres".

   - Área de Upload de Arquivos (para anexar Relatórios Técnicos em PDF/CSV).

   - Botões de ação: "Salvar", "Registrar Retorno Institucional" e "Arquivar Demanda Inválida".

4. **Tela de Relatórios (Auditoria e Exportação):**

   - Uma tabela completa com o log de auditoria e histórico de movimentação das demandas.

   - Filtros por período e status da inspeção.

   - Botões proeminentes para "Exportar Relatório Gerencial (PDF)" e "Exportar (CSV)".

5. **Tela de Configurações / Minha Conta:**

   - Edição de informações do perfil do servidor (Nome, E-mail).

   - Alteração de senha com validação de segurança.

   - Toggles (chaves) para configurar Preferências de Notificações e Alertas.

**Comportamento esperado do Protótipo:**

Não é necessário um backend real complexo, mas a interação deve parecer fluida e natural. Por favor, popule o sistema com dados fictícios (mock data) contextualizados para a VISAT (ex: Inspetores como João, Rafael, Téo; Órgãos como MPT, TRT, Sindicato). Assim, o Kanban e o Dashboard iniciarão preenchidos, permitindo visualizar o produto final operando na prática.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://visat-sentinel-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d035e613-3d6d-425c-bf1d-e4af72286ae3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
