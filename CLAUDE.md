# CLAUDE.md — AI-Ready TodoList

Este arquivo configura o assistente de IA para trabalhar neste projeto.
Leia este arquivo completamente antes de qualquer tarefa.

---

## Visão geral

Aplicação TodoList fullstack usada como projeto de referência para demonstrar
práticas AI-Ready. Backend em NestJS com Clean Architecture e storage em memória.
Frontend em Next.js 14 com App Router.

---

## Stack

### Backend
- NestJS + TypeScript
- Clean Architecture (domain / application / infrastructure / interfaces)
- Storage em memória — dados em array JavaScript, sem banco de dados
- Jest para testes

### Frontend
- Next.js 14 com App Router
- TypeScript
- Tailwind CSS
- Fetch API (sem biblioteca de HTTP adicional)

---

## Arquitetura — Clean Architecture

```
domain/         → entidades, value objects, eventos, interfaces de repositório
application/    → use cases, DTOs
infrastructure/ → implementação do repositório em memória
interfaces/     → controllers HTTP
```

### Regras obrigatórias

- NUNCA importar infrastructure dentro de domain/ ou application/
- Repositórios são interfaces em domain/, implementações em infrastructure/
- Use cases recebem DTOs, não entidades de ORM
- Controllers não contêm lógica de negócio — apenas orquestram use cases
- Eventos de domínio: `EntityVerbed` (ex: TodoCreated, TodoCompleted)

---

## Storage em memória

O repositório concreto (`InMemoryTodoRepository`) armazena todos em um array
JavaScript. Dados são perdidos ao reiniciar o servidor — comportamento esperado
neste projeto de referência.

---

## Convenções de código

### Nomenclatura
- Classes: PascalCase
- Interfaces: IPascalCase (ex: `ITodoRepository`)
- DTOs: PascalCase + Dto (ex: `CreateTodoDto`)
- Use cases: PascalCase + UseCase (ex: `CreateTodoUseCase`)
- Arquivos: kebab-case (ex: `create-todo.use-case.ts`)

### Erros de domínio
- Nunca lançar `Error` genérico
- Exceções específicas: `TodoNotFoundError`, `TodoAlreadyCompletedError`
- Controllers mapeiam exceções para HTTP status codes

---

## O que evitar

- Não usar `any` no TypeScript
- Não acessar o array de dados fora do InMemoryTodoRepository
- Não criar lógica de negócio nos controllers
- Não usar `console.log` — usar Logger do NestJS

---

## Spec-Driven Development

Antes de implementar qualquer feature nova:
1. Leia a spec em `backend/docs/specs/`
2. Se não existir, crie a spec antes de codificar
3. Implemente seguindo contratos e edge cases da spec
4. Marque itens do checklist como concluídos

---

## Subagentes disponíveis

- `.claude/agents/code-reviewer.md`
- `.claude/agents/test-writer.md`
- `.claude/agents/spec-writer.md`

## Skills disponíveis

- `.claude/skills/nestjs-clean-arch.md`
- `.claude/skills/nextjs-conventions.md`
