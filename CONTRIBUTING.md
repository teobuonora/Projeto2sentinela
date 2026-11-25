# Guia de Contribuição — Sentinela VISAT

## 1. Objetivo

Este documento estabelece as diretrizes de contribuição para o projeto Sentinela, visando garantir a qualidade do código, a organização do desenvolvimento e a rastreabilidade das atividades realizadas pela equipe.

## 2. Tecnologias utilizadas

- React
- TypeScript
- Tailwind CSS
- Supabase
- Lovable
- Git e GitHub

## 3. Fluxo de desenvolvimento

1. Identificar a tarefa no Trello.
2. Criar uma Issue no GitHub.
3. Atribuir a Issue ao integrante responsável.
4. Criar uma branch a partir da main.
5. Implementar e validar as alterações.
6. Registrar as alterações por meio de commits.
7. Abrir um Pull Request.
8. Revisar e integrar as alterações à main.

## 4. Padrão de branches

Utilizar nomes descritivos conforme o tipo de contribuição:

- feat/: novas funcionalidades.
- fix/: correções de bugs.
- docs/: alterações na documentação.
- test/: implementação ou atualização de testes.
- refactor/: melhorias na estrutura do código.

## 5. Padrão de commits

As mensagens devem ser objetivas e identificar a alteração realizada.

Exemplos:

- feat: adicionar filtro de demandas
- fix: corrigir validação de formulário
- docs: atualizar documentação
- test: adicionar teste de autenticação

Quando aplicável, incluir o identificador da história de usuário e o número da Issue correspondente.

## 6. Pull Requests e rastreabilidade

Todo Pull Request deve apresentar:

- Descrição das alterações realizadas.
- Referência à Issue correspondente.
- Identificação da história de usuário, quando aplicável.
- Evidências de validação ou testes.

Utilizar a expressão Closes #N, substituindo N pelo número da Issue, para encerrá-la automaticamente após a integração à branch principal.

## 7. Desenvolvimento com Lovable

As alterações realizadas pelo Lovable devem ser revisadas e testadas antes da publicação.

Os integrantes devem garantir o registro de suas contribuições por meio de commits próprios ou coautoria, quando houver participação efetiva em conjunto.

## 8. Qualidade e testes

Antes de integrar uma alteração:

- Verificar o funcionamento das funcionalidades modificadas.
- Avaliar possíveis impactos nas funcionalidades existentes.
- Executar os testes automatizados disponíveis.
- Registrar bugs identificados por meio de Issues.
- Vincular as evidências de teste aos cartões do Trello.

## 9. Segurança

- Não versionar arquivos .env.
- Não compartilhar senhas, tokens ou chaves privadas.
- Utilizar variáveis de ambiente para configurações sensíveis.
- Manter um arquivo .env.example sem credenciais reais.
- Não utilizar dados pessoais reais em testes.

## 10. Pair Programming

As atividades realizadas em pares devem ser documentadas, identificando os participantes, as tarefas desenvolvidas e os resultados obtidos.

A coautoria dos commits deve refletir a participação real dos integrantes.

## 11. Responsabilidade da equipe

Todos os integrantes devem contribuir para a evolução do projeto, manter a documentação atualizada e preservar a estabilidade da aplicação publicada.
