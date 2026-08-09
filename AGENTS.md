# ManagerQA - Agent Instructions

## Objetivo

O ManagerQA é uma plataforma web para gerenciamento de atividades de QA.
O foco atual do projeto é demonstrar QA Automation, testes de API/E2E,
CI/CD, integração Jira/GitHub e uma interface moderna.

O backend existente será reaproveitado. O frontend será reconstruído
do zero.

## Stack

### Backend existente
- Java
- Spring Boot
- Maven
- Spring Data JPA
- PostgreSQL
- REST API

### Frontend novo
- React
- TypeScript
- Vite
- Mantine

### QA
- Playwright

### CI/CD
- GitHub Actions

### Gestão/versionamento
- Jira
- Git/GitHub

## Regra principal

O backend existente é a base funcional do sistema e deve ser preservado
enquanto não houver necessidade real de alteração.

O objetivo inicial NÃO é reescrever o backend.

O frontend será desenvolvido do zero consumindo a API existente.

Alterações no backend somente devem ocorrer quando necessárias para:
- corrigir defeitos;
- suportar novas funcionalidades;
- melhorar testabilidade;
- corrigir problemas arquiteturais relevantes;
- permitir integrações necessárias.

Antes de uma alteração relevante no backend:
1. analisar o comportamento atual;
2. avaliar impacto;
3. explicar a necessidade;
4. implementar a menor alteração adequada;
5. executar os testes.

## Backend

O backend segue arquitetura em camadas:

Controller
    ↓
Service
    ↓
Repository
    ↓
Database

Não mover regras de negócio para o frontend.

Não alterar contratos de API sem avaliar impacto.

## Frontend

O frontend será reconstruído do zero.

Utilizar:
- React
- TypeScript
- Vite
- Mantine

Priorizar:
- componentes reutilizáveis;
- acessibilidade;
- estados de loading;
- tratamento de erros;
- formulários;
- tabelas;
- filtros;
- paginação;
- feedback visual;
- testabilidade.

Preferir componentes do Mantine quando forem adequados.

Não criar complexidade visual desnecessária.

## QA

O projeto deve ser desenvolvido considerando testabilidade desde o início.

Playwright será utilizado para:
- testes de API;
- testes E2E;
- smoke tests;
- cenários negativos;
- regressão;
- evidências e relatórios.

Os testes devem usar seletores estáveis e evitar dependência de posição
ou estrutura frágil do HTML.

## Git

Branches permanentes:
- main
- develop

Branches temporárias:
- feature/*
- bugfix/*
- hotfix/*

Exemplo:
feature/UD-1-demandas

Branches de feature devem ser criadas a partir de develop e podem ser
removidas após o merge.

## Jira

Usar a chave da demanda nas branches, commits e Pull Requests quando
houver relação com uma demanda.

Exemplo:
feature/UD-1-demandas

A rastreabilidade desejada é:

Jira
  ↓
Demanda
  ↓
Branch
  ↓
Commit
  ↓
Pull Request
  ↓
GitHub Actions
  ↓
Testes
  ↓
Resultado

## Ambientes

Branches não representam ambientes.

Os ambientes serão controlados por URLs/configurações do pipeline.

Nunca colocar credenciais, tokens ou secrets no código.

## Uso de IA

O agente pode acelerar implementação, refatoração, documentação e testes,
mas não deve tomar decisões arquiteturais importantes silenciosamente.

Se uma abordagem parecer tecnicamente inadequada:
- dizer claramente o problema;
- explicar o motivo;
- propor alternativa.

Não concordar automaticamente com uma proposta apenas para agradar.

Não implementar funcionalidades desnecessárias.
Priorizar o objetivo do projeto e a testabilidade.
