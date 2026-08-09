# ManagerQA — Regras de Negócio

## 1. Objetivo

O ManagerQA é uma plataforma para gerenciamento do ciclo de QA,
permitindo controlar demandas, módulos, tecnologias, casos de teste,
planos, suítes, execuções, regressões e integração com Jira.

O backend atual será reaproveitado.
O frontend será reconstruído do zero.

## 2. Entidades

O sistema deve possuir inicialmente:

- Developer
- SystemModule
- Technology
- TestCase
- TesterQA
- TestPlan
- TestSuite
- Regression
- ModelCase
- User

A estrutura real dessas entidades deve respeitar o backend existente
e ser analisada antes de alterações.

## 3. CRUD

Cadastros aplicáveis devem permitir:
- listar;
- consultar;
- criar;
- editar.

Exclusão somente quando fizer sentido para a regra de negócio.

Não criar CRUD mecanicamente para entidades que não sejam cadastros.

## 4. Módulos e sistemas

O sistema deve permitir gerenciar os módulos dos sistemas acompanhados
pelo QA.

Os módulos serão utilizados para relacionar demandas, casos de teste,
planos, suítes, execuções e regressões quando aplicável.

## 5. Tecnologias

O sistema deve permitir cadastrar e gerenciar tecnologias utilizadas
nos projetos/sistemas.

## 6. Usuários

O sistema deve representar os participantes do processo, considerando:
- User;
- Developer;
- TesterQA.

Os relacionamentos devem respeitar o modelo atual do backend.

## 7. Casos de teste

O sistema deve permitir criar e gerenciar casos de teste.

Um caso de teste pode possuir:
- título;
- descrição;
- pré-condições;
- passos;
- resultado esperado;
- módulo;
- prioridade;
- tipo;
- status;
- responsável;
- evidências.

Os atributos definitivos devem ser compatíveis com o backend atual e
com a evolução necessária do domínio.

## 8. Modelos de teste

Deve existir um módulo de ModelCase.

O usuário deve poder:
- criar modelo;
- editar modelo;
- listar modelos;
- consultar modelo;
- utilizar modelo para criar um caso de teste.

Ao criar um caso a partir de um modelo, o caso deve possuir seus próprios
dados para não ficar dependente de alterações posteriores no modelo.

## 9. TestPlan

Deve permitir organizar atividades de teste relacionadas a uma finalidade,
versão, demanda ou ciclo de validação.

Pode conter casos e/ou suítes de teste.

## 10. TestSuite

Deve permitir agrupar casos de teste para execução conjunta.

Um caso de teste pode participar de múltiplas suítes quando aplicável.

## 11. Regressão

Deve existir um módulo específico de Regression.

A regressão deve permitir importar ou selecionar demandas que chegaram
ao status:

PRONTO PARA PRODUÇÃO

no Jira.

A referência da demanda original deve ser preservada.

O módulo deve permitir organizar os itens selecionados para uma execução
de regressão.

Uma execução deve registrar, quando aplicável:
- data;
- responsável;
- itens;
- resultado;
- evidências;
- falhas;
- observações.

A regressão completa poderá ser acionada manualmente pelo pipeline.

## 12. Integração Jira

O ManagerQA deve possuir integração com Jira e manter rastreabilidade
das demandas relacionadas ao processo de QA.

O fluxo considerado pelo sistema é:

COMEÇAR
  ↓
PENDENTE

PENDENTE --AR--> EM ANÁLISE

EM ANÁLISE --executando--> EM ANDAMENTO

### A partir de EM ANDAMENTO

- Impedimento Dev → IMPEDIMENTO → Qualquer → EM ANÁLISE
- Aprovação → PULL REQUEST
- PAUSA → PAUSADO
- Qualquer → PENDENTE

### A partir de PULL REQUEST

- Qualquer → EM ANDAMENTO
- Reprovado → RETORNO PULL REQUEST → PR Reprovado → EM ANDAMENTO
- Enviado para teste → PRONTO PARA TESTE

### Fluxo de QA

PRONTO PARA TESTE --Em teste--> TESTE EM PROGRESSO

TESTE EM PROGRESSO:
- Impedimento QA → IMPEDIMENTO TESTE
- Retornando → RETORNO → PAUSADO ou PENDENTE
- Aprovado pelo teste → PRONTO PARA PRODUÇÃO

### Fase final

PRONTO PARA PRODUÇÃO --Deploy realizado--> ENVIADO PARA PRODUÇÃO

## 13. Automação

Playwright deverá cobrir progressivamente:
- API;
- E2E;
- smoke;
- cenários negativos;
- regressão;
- evidências;
- relatórios.

A regressão completa não deve ser executada automaticamente a cada
movimentação de uma demanda para PRONTO PARA PRODUÇÃO.

Ela deve poder ser acionada manualmente pelo pipeline.

## 14. Qualidade

Toda nova funcionalidade deve ser pensada para ser testável.

Alterações de regra de negócio devem possuir testes adequados.

O frontend deve disponibilizar seletores estáveis para automação.

## 15. Rastreabilidade

A cadeia desejada é:

Jira
 ↓
Demanda
 ↓
Branch/Commit/PR
 ↓
Pipeline
 ↓
Testes
 ↓
Resultado
 ↓
Release
