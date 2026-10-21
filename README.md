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

### 🚀 Funcionalidades

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

### 1. Visão Geral do Board (Kanban)
https://trello.com/invite/b/6a8e24da1ec9edf79652c3e9/ATTIa17ec0dadad27ab9ce3d3248c07f1bad9D3888E0/fds-visat
<img width="1716" height="769" alt="image" src="https://github.com/user-attachments/assets/b0892f85-4f3b-4260-9518-c41f1acc5db1" />


### 2. Backlog Priorizado
<img width="1343" height="829" alt="image" src="https://github.com/user-attachments/assets/15ce0ef1-a20b-4573-9452-c0df15cdf193" />


## 3. 🔀 Fluxo e Diagrama de atividades dos usuários
  https://www.figma.com/board/XjwKd8ciVyNiVvgoSj8sBp/Sem-t%25C3%25ADtulo?node-id=0-1&p=f&t=Hu4MZhnQXKMuzPST-0

## 4. ▶ Protótipo
https://visat-sentinel-hub.lovable.app

## 5. ▶ Vídeo
https://youtu.be/3X2HAB32n10
---

##👥 Prática de Programação em Par (Pair Programming)

Durante o ciclo de desenvolvimento da **Sprint 01**, a equipe adotou a prática ágil de **Programação em Par (Pair Programming)** para acelerar a curva de aprendizado nas tecnologias utilizadas (TypeScript, TanStack Start e banco de dados relacional), nivelar a qualidade do código e reduzir retrabalhos através de revisão contínua em tempo de desenvolvimento.

A prática foi estruturada no modelo clássico de **Piloto (Driver)** — responsável pela escrita direta do código e implementação imediata — e **Copiloto (Navigator)** — focado na arquitetura, revisão de regras de negócio, antecipação de bugs e conformidade com os critérios de aceitação.

---

### 📋 Resumo das Sessões Realizadas

| Sessão | Dupla de Desenvolvimento | Foco / Histórias Atendidas | Duração |
| :--- | :--- | :--- | :--- |
| **Sessão 1** | **Téo Buonora** (Piloto) & **Rubens Souza** (Copiloto) | Persistência no Banco, Tabela `demandas` e Realtime | ~2h 30m |
| **Sessão 2** | **Lucas Soares** (Piloto) & **Téo Buonora** (Copiloto) | UH4: Upload e Storage de Relatórios Técnicos | ~2h 00m |
| **Sessão 3** | **João Gabriel** (Piloto) & **Rafael Gurgel** (Copiloto) | UH3 e UH5: Drag-and-Drop do Kanban e Alertas de Prazos | ~2h 15m |
| **Sessão 4** | **Pedro Peixoto** (Piloto) & **Heitor D'Albuquerque** (Copiloto) | HU16: Exportação Gerencial de Relatórios (PDF/CSV) | ~1h 45m |

---

### 🔍 Relato Detalhado das Sessões

#### 1. Persistência de Dados e Políticas de Acesso
- **Dupla:** **Téo Buonora** (Piloto) e **Rubens Souza** (Copiloto / Arquiteto)
- **Escopo:** Substituição do estado em memória pela persistência relacional na tabela `demandas`, configuração de canais de sincronização em tempo real (*realtime*) e definição de políticas de controle de acesso (RLS).
- **Dinâmica:** Enquanto Téo codificava as funções do provedor de dados e as chamadas de mutação, Rubens atuava validando os tipos em TypeScript e garantindo que as permissões e índices estivessem alinhados com a arquitetura definida.
- **Desafio Superado:** Evitar condições de corrida ao mover cards no Kanban rapidamente antes da resposta do banco; a dupla implementou uma atualização otimista na interface combinada com a sincronização via canal Postgres Changes.

#### 2. Implementação de Storage e Upload de Arquivos (UH4)
- **Dupla:** **Lucas Soares** (Piloto / Front-end) e **Téo Buonora** (Copiloto / Back-end)
- **Escopo:** Criação do fluxo completo de upload de relatórios técnicos (PDF/CSV até 20MB) integrando o componente de modal com o bucket de armazenamento.
- **Dinâmica:** Lucas conduziu a montagem dos elementos de interface, validação visual de extensão e barra de progresso. Téo guiou a integração das chamadas de API do cliente, o tratamento de respostas de erro e a vinculação dos metadados do arquivo à demanda salva.
- **Desafio Superado:** Tratamento do download seguro e da exclusão do arquivo físico caso o usuário cancelasse a adição do anexo antes de salvar a demanda.

#### 3. Interatividade do Kanban e Alertas Visuais (UH3 & UH5)
- **Dupla:** **João Gabriel** (Piloto / Front-end) e **Rafael Gurgel** (Copiloto / Scrum Master)
- **Escopo:** Mecânica de arrastar e soltar entre as 4 colunas de status e cálculo semântico das cores dos prazos (vermelho para atrasado/vence hoje, amarelo para até 5 dias e verde para dentro do prazo).
- **Dinâmica:** João implementou a lógica dos manipuladores de evento HTML5 (`dragStart`, `dragOver`, `drop`). Rafael atuou conferindo a aderência aos critérios de aceitação da história e garantindo que o cálculo de dias úteis e diferenças de datas atendesse às regras da VISAT.
- **Desafio Superado:** Ajustar o feedback visual no momento em que o card sobrevoa colunas vazias sem que ocorresse flickering na interface.

#### 4. Exportação de Relatórios Gerenciais (HU16) & Critérios de PO
- **Dupla:** **Pedro Peixoto** (Piloto / QA) e **Heitor D'Albuquerque** (Copiloto / Product Owner)
- **Escopo:** Implementação dos downloads reais de relatórios nos formatos PDF formatado e CSV tabulado com base nos filtros ativos na tela de auditoria.
- **Dinâmica:** Pedro construiu os geradores de dados e a sanitização dos cabeçalhos das tabelas. Heitor validou se as informações institucionais exigidas pela VISAT (número de protocolo, prazos, inspetor e histórico de pareceres) estavam presentes no layout do documento.
- **Desafio Superado:** Garantir que o PDF quebrasse páginas de forma legível em listagens com grande volume de movimentações sem cortar linhas de texto.

---

### 💡 Lições Aprendidas e Conclusão da Equipe

1. **Redução Drástica de Bugs:** Erros de tipagem, problemas de sincronização e inconsistências de interface foram detectados no momento exato em que estavam sendo digitados, eliminando ciclos longos de depuração pós-merge.
2. **Disseminação do Conhecimento:** Integrantes com foco em UI compreenderam a camada de comunicação assíncrona com o backend, enquanto os desenvolvedores de dados entenderam melhor os impactos da renderização reativa nos componentes visuais.
3. **Comunicação e Alinhamento:** O pareamento entre desenvolvedores e papéis de PO/Scrum Master encurtou o ciclo de feedback das regras de negócio, garantindo que as histórias fossem entregues estritamente conforme o planejado.


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
