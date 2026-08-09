# Análise do Backend Atual

## Objetivo

O backend atual do ManagerQA será utilizado como base do novo projeto.

Ele NÃO será tratado como um backend a ser descartado ou automaticamente
reescrito.

O objetivo da análise é entender o que já existe antes de construir o
novo frontend e decidir, apenas quando necessário, quais partes do backend
precisam evoluir.

## Analisar

- entidades;
- relacionamentos;
- endpoints;
- DTOs;
- regras de negócio;
- controllers;
- services;
- repositories;
- validações;
- tratamento de exceções;
- autenticação/autorização, se existir;
- integrações;
- problemas de arquitetura;
- limitações para testabilidade;
- funcionalidades que faltam para os requisitos atuais.

## Não fazer

- não copiar código desnecessariamente;
- não reescrever o backend inteiro;
- não alterar contratos sem avaliar impacto;
- não assumir que a arquitetura antiga é perfeita;
- não criar refatorações apenas por preferência estética.

## Resultado esperado

Documentar:

1. O que já existe.
2. O que será reutilizado sem alteração.
3. O que precisa de pequenos ajustes.
4. O que precisa ser evoluído.
5. O que está faltando.
6. Problemas que impactam QA/testabilidade.
7. Recomendações de evolução.

## Prioridade

O backend existente é a fonte atual de comportamento da aplicação,
enquanto docs/regras-de-negocio.md e docs/requisitos.md representam
a direção desejada para a evolução.

Em caso de conflito, avaliar o impacto e propor uma decisão explícita
antes de alterar o comportamento.
