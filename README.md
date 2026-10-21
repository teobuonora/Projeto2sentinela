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

## 👥 Prática de Programação em Par (Pair Programming)

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


