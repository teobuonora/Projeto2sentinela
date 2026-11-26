<img width="1408" height="768" alt="Gemini_Generated_Image_lgc4crlgc4crlgc4" src="https://github.com/user-attachments/assets/1150479c-7a18-4052-80ed-24d0b8ca0e08" />

# 👁️ SENTINELA
---

## 🎯 Sobre o Produto
Uma aplicação web desenvolvida especificamente para a **Secretaria Executiva de Vigilância em Saúde do Trabalhador (VISAT) / Secretaria de Saúde do Recife**. 

A ferramenta centraliza o recebimento de demandas de órgãos de controle e articulação (MPT, TRT, Conselhos, Sindicatos), gerencia a execução das inspeções pela equipe técnica e fornece painéis com indicadores de tempo real. O objetivo é evitar a perda de prazos legais, rastrear a carga de trabalho e extinguir o uso de planilhas locais para gestão de processos institucionais.

---

## 👥 Equipe e Papéis
| Integrante | Função | GitHub |
| :--- | :--- | :--- |
| **[Téo Buonora]** | Desenvolvedor Back-end |  [@Github](https://github.com/teobuonora) |
| **[Rafael Gurgel]** | Scrum Master | [@Github](https://github.com/RafaelGMedeiros) |
| **[Lucas Soares]** | Líder de Front-end & UI/UX | [@Github](https://github.com/LSP4-EXVI) |
| **[João Gabriel de Melo]** | Desenvolvedor Front-end | [@Github](https://github.com/jgml329) |
| **[Rubens Souza]** | Líder de Back-end & Arquitetura | [@Github](https://github.com/rscr-jpg) |
| **[Heitor D'Albuquerque]** | Product Owner | [@Github](https://github.com/heitortorresdev) |
| **[Pedro Peixoto]** | QA & Documentação | [@Github](https://github.com/) |

---

## 🚀 Funcionalidades

---

1. **Cadastro de Solicitações de Inspeção**
2. **Quadro Visual Interativo**
3. **Atribuição de Demandas a Inspetores**
4. **Upload de Relatórios Técnicos**
5. **Alertas Visuais para Prazos**
6. **Monitoramento da Carga de Trabalho**
7. **Cadastro de Órgãos Solicitantes**
8. **Filtro de Demandas por Órgão**
9. **Edição de Informações da Demanda**
10. **Inserção de Pareceres Textuais**
11. **Registro de Retorno Institucional**
12. **Busca Rápida por Número de Protocolo**
13. **Arquivamento de Demandas Inválidas**
14. **Login e Autenticação de Usuário**
15. **Log de Auditoria e Histórico**
16. **Exportação de Relatórios Gerenciais**

---

## 🛠️ Ferramentas Utilizadas

- **Gestão Ágil / Board:** [Trello]
- **Design / Prototipação:** [Lovable]
- **Versionamento:** [Git / GitHub]

---
## ⚙️ Como Executar o Projeto Localmente

Siga o passo a passo abaixo para clonar o repositório e executar a aplicação em seu ambiente de desenvolvimento.

### 📋 Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (versão 18 ou superior) ou [Bun](https://bun.sh/) (recomendado)
- Navegador moderno (Google Chrome, Firefox, Edge ou Safari)

---

### 🚀 Passo a Passo

#### 1. Clonar o repositório
Abra o terminal e execute:
```bash
git clone https://github.com/teobuonora/fds-visat.git
cd fds-visat
```

#### 2. Instalar as dependências
Utilize o gerenciador de pacotes de sua preferência:

*Com Bun (recomendado):*
```bash
bun install
```

*Ou com npm:*
```bash
npm install
```

#### 3. Configuração de Variáveis de Ambiente
O projeto já conta com o arquivo `.env` versionado contendo as chaves públicas necessárias para comunicação com os serviços de banco de dados, storage e autenticação do backend em nuvem (Lovable Cloud).

> ⚠️ **Importante:** Não remova nem altere as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` presentes no arquivo `.env`, pois elas inicializam o cliente do frontend.

#### 4. Iniciar o servidor de desenvolvimento
Execute o comando correspondente:

*Com Bun:*
```bash
bun dev
```

*Com npm:*
```bash
npm run dev
```

#### 5. Acessar a aplicação
Após a inicialização do Vite, acesse no navegador o endereço indicado no terminal (normalmente [http://localhost:8080](http://localhost:8080)).

---

### 🛠️ Scripts Disponíveis no Projeto

| Comando | Finalidade |
| :--- | :--- |
| `bun dev` / `npm run dev` | Inicia o servidor local com Hot Module Replacement (HMR) |
| `bun run build` / `npm run build` | Compila o bundle otimizado de produção |
| `bun run preview` / `npm run preview` | Executa localmente o build estático para testes finais |
| `bun run lint` / `npm run lint` | Executa a verificação estática do código com ESLint |

---

## 🌐 Acesso Direto (Ambiente Publicado)
Caso prefira testar a aplicação sem instalar nada localmente, o ambiente oficial em produção está disponível em:  
👉 **[visat-sentinel-hub.lovable.app](https://visat-sentinel-hub.lovable.app)**
---
## 📸 Evidências

## 1. Visão Geral do Board (Kanban)
https://trello.com/invite/b/6a8e24da1ec9edf79652c3e9/ATTIa17ec0dadad27ab9ce3d3248c07f1bad9D3888E0/fds-visat
<img width="1716" height="769" alt="image" src="https://github.com/user-attachments/assets/b0892f85-4f3b-4260-9518-c41f1acc5db1" />


## 2. Backlog Priorizado
<img width="1343" height="829" alt="image" src="https://github.com/user-attachments/assets/15ce0ef1-a20b-4573-9452-c0df15cdf193" />


## 3. 🔀 Fluxo e Diagrama de atividades dos usuários
  https://www.figma.com/board/XjwKd8ciVyNiVvgoSj8sBp/Sem-t%25C3%25ADtulo?node-id=0-1&p=f&t=Hu4MZhnQXKMuzPST-0

## 4. ▶ Protótipo
https://visat-sentinel-hub.lovable.app

## 5. ▶ Vídeo
https://youtu.be/3X2HAB32n10
---
---
# 👥 Prática de Programação em Par (Pair Programming)

Durante o ciclo de desenvolvimento da **Sprint 01**, a equipe do projeto **Sentinela VISAT** aplicou a prática ágil de **Pair Programming** (Programação em Par) para a implementação das histórias priorizadas do backlog. 

O revezamento entre **Piloto** (*Driver* — responsável pela codificação ativa) e **Copiloto** (*Navigator* — responsável pela revisão contínua, arquitetura, cenários de teste e critérios de aceitação) garantiu alta cobertura de código, redução imediata de falhas e entrega de 100% das histórias planejadas.

---

### 📋 Resumo das Sessões Realizadas na Sprint 01

| Sessão | Dupla de Desenvolvimento | Histórias Atendidas | Foco Técnico | Duração |
| :--- | :--- | :--- | :--- | :--- |
| **Sessão 1** | **Téo Buonora** (Piloto) & **Rubens Souza** (Copiloto) | **UH1** e **UH2** | Cadastro da Demanda, Atribuição de Responsável e Persistência | ~2h 30m |
| **Sessão 2** | **João Gabriel** (Piloto) & **Rafael Gurgel** (Copiloto) | **UH3** | Mover Cards de Status da Inspeção (Kanban Drag & Drop) | ~2h 15m |
| **Sessão 3** | **Lucas Soares** (Piloto) & **Téo Buonora** (Copiloto) | **UH4** | Anexo de Relatórios Técnicos (Upload e Storage de Arquivos) | ~2h 00m |
| **Sessão 4** | **Pedro Peixoto** (Piloto) & **Heitor D'Albuquerque** (Copiloto) | **UH5** | Alerta Visual de Prazos Vencendo e Regras de Negócio | ~1h 45m |

---

### 🔍 Relato Detalhado das Sessões de Pareamento

## 1. Cadastro de Demanda e Atribuição de Responsável (UH1 & UH2)
- **Dupla:** **Téo Buonora** (Piloto / Full-Stack) e **Rubens Souza** (Copiloto / Arquiteto & Back-end)
- **Histórias Atendidas:** 
  - **UH1: Cadastro de Demanda** (Geração/inserção de protocolo, órgão demandante, assunto e prazo legal).
  - **UH2: Atribuição de Responsável** (Seleção e vínculo do inspetor técnico responsável no formulário modal).
- **Dinâmica do Pareamento:** Téo estruturou os componentes do modal (`demanda-modal.tsx`), campos de formulário e a integração com o banco de dados. Rubens atuou verificando o esquema relacional da tabela `demandas`, tipos TypeScript e a reatividade do estado global para que a nova demanda aparecesse instantaneamente na coluna *"Recebidas"*.
- **Desafio Superado:** Tratamento de validação para impedir protocolos em branco e sincronização em tempo real (*realtime*) para evitar inconsistências caso múltiplos servidores estejam operando o sistema simultaneamente.

### 2. Movimentação dos Cards no Kanban de Inspeção (UH3)
- **Dupla:** **João Gabriel** (Piloto / Front-end) e **Rafael Gurgel** (Copiloto / Scrum Master)
- **História Atendida:** 
  - **UH3: Mover Cards de Status da Inspeção** (Fluxo entre as colunas: *Recebidas*, *Em Análise*, *Em Atendimento* e *Concluídas*).
- **Dinâmica do Pareamento:** João programou a manipulação nativa de eventos HTML5 Drag-and-Drop (`onDragStart`, `onDragOver`, `onDrop`) e a atualização visual dos cards. Rafael conferiu a conformidade com o fluxo de trabalho da VISAT e validou os estados de transição válidos entre as colunas.
- **Desafio Superado:** Eliminar o efeito visual de tremulação (*flickering*) quando um card é arrastado sobre colunas sem demandas e garantir que a mutação no banco persista a nova coluna de status imediatamente.

### 3. Anexo e Armazenamento de Relatórios Técnicos (UH4)
- **Dupla:** **Lucas Soares** (Piloto / UI & Front-end) e **Téo Buonora** (Copiloto / Back-end)
- **História Atendida:** 
  - **UH4: Anexo de Relatórios Técnicos** (Área de upload para pareceres, laudos em PDF e planilhas CSV).
- **Dinâmica do Pareamento:** Lucas construiu a interface da zona de upload com suporte a *drag & drop* de arquivos, validação visual de extensões e limites de tamanho (até 20 MB). Téo orientou a comunicação com o bucket de armazenamento de arquivos no servidor, a geração de links para download seguro e o cancelamento/remoção de anexos.
- **Desafio Superado:** Garantir que o upload do arquivo físico ocorra de forma assíncrona com tratamento de erros (ex: formato inválido ou arquivo muito grande) sem bloquear a gravação dos dados textuais da demanda.

### 4. Sinalização e Alerta Visual de Prazos Legais (UH5)
- **Dupla:** **Pedro Peixoto** (Piloto / QA & Testes) e **Heitor D'Albuquerque** (Copiloto / Product Owner)
- **História Atendida:** 
  - **UH5: Alerta Visual de Prazos Vencendo** (Classificação visual automática por semáforo de criticidade).
- **Dinâmica do Pareamento:** Pedro implementou a função utilitária de cálculo de datas e a aplicação condicional das cores semânticas nas tags dos cartões. Heitor acompanhou a sessão validando cada critério de aceitação de negócio:
  - 🔴 **Vermelho:** Prazo vencido ou com vencimento no dia corrente (Atrasado / Vence Hoje).
  - 🟡 **Amarelo:** Prazo com vencimento próximo (1 a 5 dias restantes).
  - 🟢 **Verde:** Prazo confortável (mais de 5 dias restantes).
- **Desafio Superado:** Prevenção de discrepâncias de fuso horário (UTC vs horário local de Brasília) no cálculo da diferença de dias, garantindo que demandas com vencimento na data de hoje sejam sempre marcadas com alerta crítico imediato.

---

### 💡 Lições Aprendidas e Benefícios Observados

1. **Detecção Imediata de Bugs de Integração:** Erros de tipagem e assincronia foram corrigidos durante a digitação no pair programming, dispensando sessões demoradas de depuração pós-merge.
2. **Nivelamento Técnico da Equipe:** Os membros voltados a design/front-end aprofundaram conhecimento em persistência e APIs de storage, enquanto os desenvolvedores de back-end aprimoraram a experiência do usuário (UX).
3. **Aderência aos Critérios de Aceitação:** A participação ativa dos papéis de Scrum Master e Product Owner nas duplas garantiu que todas as histórias (UH1 a UH5) fossem entregues estritamente de acordo com as necessidades operacionais da VISAT.

---

## 🐛 Rastreamento de Bugs e Defeitos (Issue & Bug Tracker)

Para garantir a qualidade contínua do software e a rastreabilidade do ciclo de vida dos defeitos, a equipe utilizou o processo de registro de *issues/bugs*. Abaixo está o consolidado dos problemas identificados durante os testes exploratórios e de integração, classificados por severidade e com suas respectivas soluções implementadas.

---

### 📊 Matriz de Rastreamento de Defeitos

| ID | Descrição do Defeito | Severidade | Módulo Afetado | Responsável | Status | Solução Aplicada |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **BUG-01** | Perda de alterações e novas demandas criadas após atualizar a página (F5) ou acesso por múltiplos navegadores | **Crítica** | Dados & Estado Global | Téo Buonora | **Resolvido** | Migração do estado em memória local para persistência relacional na tabela `demandas` com sincronização via canal Realtime. |
| **BUG-02** | Tela Minha Conta / Configurações exibia dados estáticos e alteração de senha apenas emitia toast sem atualizar credenciais | **Alta** | Perfil & Autenticação | Rubens Souza | **Resolvido** | Integração do formulário aos dados reais da sessão ativa (`user_metadata`) e chamada ao serviço de atualização de senha com reautenticação prévia. |
| **BUG-03** | Upload de arquivos na modal de demandas salvava apenas o nome do arquivo, sem armazenar o binário no servidor (UH4) | **Alta** | Anexos & Storage | Lucas Soares | **Resolvido** | Configuração do bucket de armazenamento para relatórios técnicos (PDF/CSV até 20MB) com download e deleção física sincronizada. |
| **BUG-04** | Botões de exportação de relatório gerencial na tela de auditoria apenas mostravam notificação de sucesso sem baixar arquivos (HU16) | **Média** | Relatórios | Pedro Peixoto | **Resolvido** | Implementação de rotinas de conversão e geração de PDF com cabeçalho institucional e download direto de arquivos CSV formatados. |
| **BUG-05** | Incompatibilidade de tipos e quebra de montagem da modal de demandas após refatoração dos anexos para objeto | **Alta** | Interface / Modal | João Gabriel | **Resolvido** | Correção da tipagem TypeScript da interface `Demanda` e sanitização de dados legados no carregamento de anexos. |
| **BUG-06** | Erro de tipagem no componente de erro raiz (`ErrorComponentProps`) após atualização dos pacotes do TanStack Router | **Média** | Core / Rotas | Rafael Gurgel | **Resolvido** | Adequação da assinatura das props do componente de fallback de erro e rebuild da árvore de rotas geradas. |

---

## 🏃‍♂️Sprint e Backlog

---
https://trello.com/invite/b/6a8e24da1ec9edf79652c3e9/ATTIa17ec0dadad27ab9ce3d3248c07f1bad9D3888E0/fds-visat
<img width="1595" height="838" alt="image" src="https://github.com/user-attachments/assets/4b874d2d-ba44-44ce-b0eb-cbe1ef480c61" />

---

## 📺Screencast

---

UH5
https://github.com/user-attachments/assets/0d3e4b6d-be2f-4eae-a412-e147116b73d3


UH4
https://github.com/user-attachments/assets/ae5bba8e-1273-4be1-b9f3-8a8273c7d357


UH3
https://github.com/user-attachments/assets/80b6c393-8a9a-488a-ad18-5d78e2ee7bcd


UH2
https://github.com/user-attachments/assets/1417fd86-5070-40b4-971d-c7b9b3707425


UH1
https://github.com/user-attachments/assets/cf1d6e0e-90d4-417b-862b-c8a286628c16

---
# Sprint 2
---
## 👥 Relato de Programação em Pares (Pair Programming)

Com o objetivo de elevar a qualidade de código, acelerar a resolução de problemas complexos e disseminar o conhecimento do ecossistema técnico (React 19, TanStack Start, Tailwind v4 e Lovable Cloud), a equipe organizou sessões estruturadas de programação em pares utilizando a dinâmica **Driver/Navigator** (Piloto e Copiloto), alternando os papéis entre os integrantes.

Abaixo está o registro detalhado das sessões dedicadas à implementação e refinamento das histórias de usuário **UH6, UH8, UH9, UH10 e UH15**.

---

### 📊 Quadro Resumo das Sessões

| Sessão | Data | Piloto (*Driver*) | Copiloto (*Navigator*) | Histórias Atendidas | Módulos / Arquivos Principais |
| :---: | :---: | :--- | :--- | :---: | :--- |
| **01** | 22/10/2026 | **Téo Buonora** | **Rafael Gurgel** | **UH6** | `src/routes/_authenticated/index.tsx` |
| **02** | 23/10/2026 | **João Gabriel** | **Téo Buonora** | **UH8** | `src/routes/_authenticated/demandas.tsx` |
| **03** | 24/10/2026 | **Lucas Soares** | **Heitor D'Albuquerque** | **UH9** e **UH10** | `src/components/demanda-modal.tsx` |
| **04** | 25/10/2026 | **Pedro Peixoto** | **Rubens Souza** | **UH15** | `src/routes/_authenticated/relatorios.tsx`, `src/lib/sentinela-data.tsx` |

---

### 📝 Detalhamento das Sessões

#### Sessão 01 — Visualização da Carga de Trabalho por Inspetor
* **História de Usuário:** **UH6** (*Visualização da Carga de Trabalho*)
* **Dupla:** **Téo Buonora** (Piloto) e **Rafael Gurgel** (Copiloto)
* **Objetivo:** Construir no painel principal (Dashboard) a agregação em tempo real da distribuição de demandas ativas atribuídas a cada inspetor sanitário da VISAT, com ordenação por sobrecarga e barras visuais de progresso relativo.
* **Dinâmica do Pareamento:**
  * **Téo Buonora (Piloto):** Escreveu o cálculo reativo utilizando `useMemo` sobre a lista de demandas ativas (excluindo concluídas), mapeando os inspetores pré-cadastrados (`INSPETORES`), totalizando os processos sob responsabilidade de cada um e integrando os componentes `Progress` do shadcn/ui.
  * **Rafael Gurgel (Copiloto):** Acompanhou a lógica matemática de normalização percentual (`(total / maxCarga) * 100`) para garantir que mesmo com volumes variáveis a barra nunca ultrapassasse 100% ou gerasse divisão por zero (`Math.max(1, ...)`), além de validar a tipografia tabular (`tabular-nums`) para evitar desalinhamentos nos números.
* **Desafio Superado:** Evitar que demandas com status "Concluídas" inflacionassem o cômputo da carga de trabalho vigente do inspetor, garantindo que apenas processos pendentes de análise e atendimento computassem como sobrecarga real da equipe.
* **Arquivos Alterados:** `src/routes/_authenticated/index.tsx`

---

#### Sessão 02 — Filtro do Quadro Kanban por Órgão Demandante
* **História de Usuário:** **UH8** (*Filtro do Quadro por Órgão Demandante*)
* **Dupla:** **João Gabriel** (Piloto) e **Téo Buonora** (Copiloto)
* **Objetivo:** Adicionar no topo do quadro Kanban um seletor dinâmico que permita isolar processos originados por entidades externas específicas (MPT, TRT, Sindicatos, CEREST, Defensoria, MPE), integrando-se aos filtros existentes de inspetor e status.
* **Dinâmica do Pareamento:**
  * **João Gabriel (Piloto):** Codificou o componente auxiliar `FiltroSelect`, gerenciou o estado `orgao` na rota `/demandas` e construiu o predicado booleano `(orgao === "todos" || d.orgao === orgao)` dentro da cadeia de filtros memoizada.
  * **Téo Buonora (Copiloto):** Conduziu os testes de interface visualizando a reatividade dos cards nas 4 colunas simultaneamente. Sugeriu a inclusão de um botão condicional "Limpar filtros" que surge apenas quando algum filtro está ativo, restaurando o quadro Kanban ao estado padrão com um único clique.
* **Desafio Superado:** Garantir que o arrastar e soltar (Drag and Drop) de cards permanecesse plenamente operacional mesmo quando a visualização estivesse sob um filtro ativo por órgão, impedindo que o card sumisse do quadro sem persistir a alteração no banco.
* **Arquivos Alterados:** `src/routes/_authenticated/demandas.tsx`

---

#### Sessão 03 — Edição de Informações da Demanda e Parecer Técnico Rápido
* **Histórias de Usuário:** **UH9** (*Edição de Informações da Demanda*) e **UH10** (*Inserção de Parecer Textual Rápido*)
* **Dupla:** **Lucas Soares** (Piloto) e **Joao Gabriel** (Copiloto)
* **Objetivo:** Permitir que o servidor clique em qualquer card do Kanban para abrir o modal pré-preenchido com os dados atuais da demanda, editar campos cadastrais e registrar o parecer técnico da inspeção sanitária com persistência na base de dados.
* **Dinâmica do Pareamento:**
  * **Lucas Soares (Piloto):** Implementou o hook de sincronização `useEffect` no `DemandaModal` para preencher o formulário ao receber a prop `demanda`, configurou o campo `Textarea` dedicado à inserção de pareceres e amarrou a chamada `salvar()` ao método `atualizar()` do contexto global do Sentinela.
  * **Heitor D'Albuquerque (Copiloto):** Atuou na validação dos campos obrigatórios (protocolo e data de prazo legal), garantiu que a edição preservasse os anexos e o histórico de auditoria já acumulados e revisou os toasts de feedback para sinalizar sucesso ou falha imediata na atualização.
* **Desafio Superado:** Evitar a perda de dados prévios de histórico e anexos ao enviar o payload atualizado da demanda para o banco de dados via upsert.
* **Arquivos Alterados:** `src/components/demanda-modal.tsx`, `src/lib/sentinela-data.tsx`

---

#### Sessão 04 — Histórico de Ações e Log de Auditoria
* **História de Usuário:** **UH15** (*Histórico de Ações - Log de Auditoria*)
* **Dupla:** **Pedro Peixoto** (Piloto) e **Rubens Souza** (Copiloto)
* **Objetivo:** Estruturar a trilha de auditoria rastreando todas as movimentações e atualizações do ciclo de vida das demandas, exibindo uma linha do tempo detalhada no modal e uma central de relatórios com filtros por período e status.
* **Dinâmica do Pareamento:**
  * **Pedro Peixoto (Piloto):** Criou a tabela de auditoria em `src/routes/_authenticated/relatorios.tsx`, mapeando e achatando a coluna JSONB `historico` de todas as demandas em linhas cronológicas decrescentes compostas por Data/Hora, Protocolo, Órgão, Inspetor, Autor e Descrição da Ação.
  * **Rubens Souza (Copiloto):** Validou o tratamento defensivo de datas no formato ISO, a ordenação decrescente dos eventos e a renderização do bloco "Histórico de movimentações" dentro do próprio modal da demanda, assegurando que toda ação (criação, edição, transição de status ou parecer) seja registrada com autoria e data.
* **Desafio Superado:** Converter os arrays aninhados de eventos históricos de cada demanda em um conjunto plano (*flat list*) reativo, possibilitando buscas textuais e filtragens instantâneas sem degradar o tempo de renderização.
* **Arquivos Alterados:** `src/routes/_authenticated/relatorios.tsx`, `src/components/demanda-modal.tsx`, `src/lib/sentinela-data.tsx`

---

### 💡 Lições Aprendidas e Benefícios Observados

1. **Prevenção Imediata de Regressões:** O copiloto atuou como revisor em tempo real, identificando potenciais quebras de tipagem TypeScript e perda de referências em estados reativos antes mesmo da execução de builds.
2. **Nivelamento de Conhecimento:** Membros com maior familiaridade no backend em nuvem e TanStack Start orientaram os colegas nas operações assíncronas e no consumo de tipos gerados, padronizando as convenções do time.
3. **Fidelidade aos Critérios de Aceitação:** Cada sessão foi conduzida tendo a respectiva história de usuário como guia estrito, garantindo 100% de conformidade funcional e visual com os requisitos do Sentinela VISAT.
---
# Deploy funcional: https://visat-sentinel-hub.lovable.app

## 🏃‍♂️Sprint e Backlog

https://trello.com/invite/b/6a8e24da1ec9edf79652c3e9/ATTIa17ec0dadad27ab9ce3d3248c07f1bad9D3888E0/fds-visat
<img width="1813" height="824" alt="image" src="https://github.com/user-attachments/assets/f4a5dd6c-a366-49cc-95e0-50af89f4cb36" />

---

## 🐛 Rastreamento de Bugs e Defeitos (Issue & Bug Tracker)
<img width="1336" height="711" alt="image" src="https://github.com/user-attachments/assets/6350c471-a4f4-4774-aa9a-cb4e0441de5a" />

---

## 📺Screencast

---
UH6
https://github.com/user-attachments/assets/8985db34-119a-4a79-83f7-e55bdeba314a

UH8
https://github.com/user-attachments/assets/9982a6b7-95e9-4e54-b16f-1b7dc3b4d282

UH9
https://github.com/user-attachments/assets/2e4c7a72-fa4e-441f-afd2-ba110cba9f72

UH10
https://github.com/user-attachments/assets/cc346d49-baa0-4465-a690-329d10cce8bf

UH15
https://github.com/user-attachments/assets/db8cda11-d85f-4259-be62-70329a65f7da


## 🚀 Sprint 3 — Entrega 5

Durante a terceira sprint, foram implementadas seis
histórias de usuário adicionais, ampliando as
funcionalidades de gerenciamento, consulta e
acompanhamento de demandas do Sentinela VISAT.

### UH7 — Cadastro de Órgãos Solicitantes

Implementação do cadastro dinâmico de órgãos
solicitantes na área de configurações.

**Funcionalidades:**
- Cadastro e listagem de órgãos.
- Persistência dos registros.
- Bloqueio de cadastros vazios e duplicados.
- Integração com o formulário de nova demanda.
- Integração com os filtros do Kanban.

**Validação:** 8/8 testes manuais aprovados.

**Rastreabilidade:**
- [Issue #12](https://github.com/teobuonora/Projeto2sentinela/issues/12)
- [Commit 706a4b4](https://github.com/teobuonora/Projeto2sentinela/commit/706a4b4)
- [Commit 9808911](https://github.com/teobuonora/Projeto2sentinela/commit/9808911)

---

### UH11 — Registro de Retorno à Instituição Demandante

Implementação do registro formal de resposta à
instituição demandante.

**Funcionalidades:**
- Alteração do status da demanda para Respondida.
- Movimentação para a última coluna do Kanban.
- Registro automático da data de encerramento.
- Persistência das informações.

**Validação:** 6/6 testes manuais aprovados.

**Rastreabilidade:**
- [Issue #13](https://github.com/teobuonora/Projeto2sentinela/issues/13)
- [Commit bb557f4](https://github.com/teobuonora/Projeto2sentinela/commit/bb557f4)

---

### UH12 — Busca Rápida por Protocolo

Implementação de uma ferramenta de localização
rápida de demandas pelo número de protocolo.

**Funcionalidades:**
- Busca por protocolo no Kanban e Dashboard.
- Exibição dos resultados correspondentes.
- Abertura dos detalhes da demanda.
- Tratamento de buscas sem resultados.
- Limpeza dos resultados da pesquisa.

**Validação:** 7/7 testes manuais aprovados.

**Rastreabilidade:**
- [Issue #14](https://github.com/teobuonora/Projeto2sentinela/issues/14)
- [Commit 70ed6c1](https://github.com/teobuonora/Projeto2sentinela/commit/70ed6c1)
- [Commit 818daf4](https://github.com/teobuonora/Projeto2sentinela/commit/818daf4)

---

### UH13 — Arquivamento de Demandas Inválidas

Implementação do arquivamento lógico de demandas
duplicadas ou com informações inválidas, preservando
seus registros e histórico.

**Funcionalidades:**
- Alteração do status para Arquivado.
- Remoção do card do Kanban principal.
- Preservação dos dados e do histórico.
- Consulta de demandas arquivadas pelos filtros.
- Integração com a busca rápida por protocolo.

**Validação:** 7/7 testes manuais aprovados.

**Rastreabilidade:**
- [Issue #15](https://github.com/teobuonora/Projeto2sentinela/issues/15)
- [Commit c4e3207](https://github.com/teobuonora/Projeto2sentinela/commit/c4e3207)

---

### HU16 — Exportação de Relatório Gerencial

Implementação da exportação de demandas para
relatórios gerenciais.

**Funcionalidades:**
- Exportação em PDF e CSV.
- Integração com Kanban e Relatórios.
- Exportação por período e status.
- Inclusão de protocolo, órgão, status e prazo.
- Tratamento de consultas sem resultados.

**Validação:** 7/7 testes manuais aprovados.

**Rastreabilidade:**
- [Issue #17](https://github.com/teobuonora/Projeto2sentinela/issues/17)
- [Commit eb61c64](https://github.com/teobuonora/Projeto2sentinela/commit/eb61c64)

---

### 🧪 Consolidação dos Testes Manuais

| História de usuário | Testes realizados | Aprovados |
|---|---:|---:|
| UH7 | 8 | 8 |
| UH11 | 6 | 6 |
| UH12 | 7 | 7 |
| UH13 | 7 | 7 |
| HU16 | 7 | 7 |
| **Total** | **35** | **35** |

Os testes manuais foram realizados no ambiente de
prévia do Lovable, utilizando dados fictícios e
considerando os critérios de confirmação de cada
história de usuário.

Os resultados encontram-se registrados nas
respectivas issues do GitHub.

Os commits de implementação foram gerados pela
integração entre Lovable e GitHub.

---

### 🤝 Programação em Pares — Sprint 3

#### Dupla 1 — Lucas Soares Pereira e Rubens

**Histórias de usuário trabalhadas:**

- UH7 — Cadastro de Órgãos Solicitantes.
- UH11 — Registro de Retorno à Instituição Demandante.
- UH12 — Busca Rápida por Protocolo.

#### Dupla 2 — Téo Buonora e Heitor D'Albuquerque

**Histórias de usuário trabalhadas:**

- UH13 — Arquivamento de Demandas Inválidas.
- UH14 — Autenticação de Usuário (Login).
- HU16 — Exportação de Relatório Gerencial.

#### Ferramentas utilizadas

- Lovable.
- GitHub.
- Trello.

---

### 👥 Participantes da Sprint 3

- Lucas Soares Pereira.
- Téo Buonora.
- Rubens.
- João Gabriel de Melo.
- Heitor D'Albuquerque.
- Pedro Peixoto.
- Rafael Gurgel.

---

### 🌐 Aplicação publicada

[Acessar Sentinela VISAT](https://visat-sentinel-hub.lovable.app/)

---

### 📺Screencast

---
UH7
https://github.com/user-attachments/assets/5a9a87f0-37a8-4a27-99e2-0d259f556af1

UH11
https://github.com/user-attachments/assets/c4390c0e-c0b4-4544-84a4-8a45ca16b5b8

UH12
https://github.com/user-attachments/assets/810875ef-b9eb-46f1-b680-7a0de0c0421b

UH13
https://github.com/user-attachments/assets/e5a2771e-cbc2-479c-886a-79248b6eaa7b

UH14
https://github.com/user-attachments/assets/10226fbd-2614-479e-85fe-a0e75bcac3e4

HU16
https://github.com/user-attachments/assets/837afbff-92bb-446a-8b1b-5595dd4c7ee8
