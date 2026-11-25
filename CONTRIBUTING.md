# 📘 Guia de Contribuição — Sentinela VISAT

Este documento estabelece os padrões técnicos, o fluxo de versionamento e as convenções de colaboração da equipe no desenvolvimento do **Sentinela VISAT** (Sistema de Gestão de Demandas da Vigilância em Saúde do Trabalhador).

---

## 👥 1. Integrantes da Equipe

* **Téo Buonora Valença**
* **Heitor D'Albuquerque**
* **Pedro Peixoto**
* **Rafael Gurgel**
* **João Gabriel**
* **Lucas Soares Pereira**
* **Rubens Souza**

---

## 💻 2. Stack Tecnológica e Arquitetura

O projeto adota uma arquitetura full-stack moderna baseada no ecossistema TanStack e Lovable Cloud:

* **Frontend & Framework:** React 19, TanStack Start v1 (roteamento estrito via `@tanstack/react-router`), Vite 7.
* **Linguagem & Tipagem:** TypeScript 5+ com checagem rígida de tipos (`tsconfig.json`).
* **Estilização & Design System:** Tailwind CSS v4 com tokens semânticos em OKLCH (`src/styles.css`) e componentes baseados no shadcn/ui.
* **Backend como Serviço (Lovable Cloud):**
  * **Banco de Dados:** PostgreSQL com Row Level Security (RLS) habilitado.
  * **Tabelas Principais:** `public.demandas` (gestão dos processos de fiscalização) e `public.orgaos` (órgãos demandantes).
  * **Armazenamento de Arquivos:** Bucket `anexos` (relatórios técnicos periciais em PDF/CSV de até 20 MB).
  * **Tempo Real:** Canal Postgres Changes para sincronização instantânea das colunas do Kanban.
* **Gerenciador de Pacotes e Testes:** Bun e Vitest (`bun test`).

---

## 🔄 3. Ciclo de Desenvolvimento e Versionamento

O repositório opera com **sincronização bidirecional ativa (*two-way sync*)** entre o GitHub e a plataforma Lovable na branch principal (`main`).

### 3.1. Fluxo de Trabalho (Workflow)
1. **Seleção de Item no Board:** Mover a História de Usuário (ex.: `UH1`, `UH4`) ou defeito técnico da coluna *Sprint Backlog* para *In Progress* no GitHub Projects / Board da Sprint.
2. **Criação de Issue:** Toda alteração significativa deve possuir uma Issue correspondente aberta no GitHub contendo:
   * Contexto e motivação técnica.
   * Critérios de aceitação da história.
   * Histórico de commits relacionados.
3. **Desenvolvimento em Branches ou Pareamento:**
   * Para desenvolvimento local via Git: criar ramificação a partir da `main`.
   * Para sessões com IA / Lovable: validar a integridade no preview antes da mesclagem na branch sincronizada.
4. **Validação e Teste Local:** Executar a suíte de testes (`bun test`) e verificar se não há quebras no build do TypeScript.
5. **Integração e Fechamento:** Ao concluir, referenciar a issue na mensagem de commit ou pull request utilizando `Closes #N` para encerramento automático.

---

## 🌿 4. Padrão de Nomenclatura de Branches

Utilizar prefixos padronizados em inglês minúsculo, seguidos pelo identificador da história ou módulo:

* `feat/UH<n>-descricao-curta`: Nova funcionalidade (ex.: `feat/UH4-upload-storage-anexos`).
* `fix/BUG<n>-descricao-curta`: Correção de defeito (ex.: `fix/BUG01-persistencia-realtime`).
* `test/UH<n>-suite-testes`: Implementação de testes unitários ou de integração (ex.: `test/UH5-calculo-prazos`).
* `docs/atualizacao-relato`: Melhorias de documentação, atas ou guias (ex.: `docs/readme-pair-programming`).
* `refactor/otimizacao-modulo`: Refatoração interna sem alteração de comportamento externo.

---

## 💬 5. Padrão de Commits e Coautoria

As mensagens de commit devem seguir o padrão **Conventional Commits**, identificando a história atendida e creditando os participantes das sessões de **Programação em Pares (Pair Programming)**.

### Estrutura da Mensagem:
```text
<tipo>(<escopo>): <descrição no imperativo e em português>

- Detalhamento do que foi alterado
- Referência à história de usuário ou issue: Closes #N

Co-authored-by: Nome do Colega <email-do-colega@dominio.com>
