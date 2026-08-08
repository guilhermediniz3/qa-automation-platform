# QA Automation Platform

Plataforma de automação de testes desenvolvida para simular um fluxo completo de desenvolvimento e QA, integrando gerenciamento de demandas, versionamento, CI/CD e execução automatizada de testes.

O projeto tem como objetivo demonstrar, de forma prática, como a automação de QA pode ser integrada ao ciclo de desenvolvimento de software.

---

##  Objetivo

Construir uma plataforma de QA Automation capaz de integrar:

- Jira para gerenciamento do ciclo de vida das demandas;
- GitHub para versionamento e Pull Requests;
- Playwright para automação de testes;
- GitHub Actions para CI/CD;
- Testes E2E e API;
- Relatórios e evidências de execução;
- Futuramente, um agente de QA baseado em IA para análise dos resultados.

O projeto será desenvolvido de forma incremental, começando pela execução manual do fluxo e evoluindo gradualmente para automações do processo.

---

##  Arquitetura

```text
                    ┌──────────────┐
                    │     JIRA     │
                    │  Workflow    │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    GITHUB    │
                    │ Repository   │
                    │ Pull Request │
                    └──────┬───────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │  GITHUB ACTIONS  │
                  │      CI/CD       │
                  └────────┬─────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  PLAYWRIGHT  │
                    │              │
                    │ E2E / API    │
                    └──────┬───────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │ Test Results     │
                  │ Screenshots      │
                  │ Traces           │
                  │ Reports          │
                  └──────────────────┘




##  Fluxo Jira

O projeto utiliza um workflow personalizado no Jira para representar
o ciclo de vida de uma demanda, desde a análise até a produção.

<img width="2093" height="969" alt="Screenshot_1" src="https://github.com/user-attachments/assets/3b29f0dc-fb91-41cc-923d-3d18d4558585" />



