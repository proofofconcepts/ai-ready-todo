# AI-Ready TodoList

Projeto de referência para o e-book **"AI-Ready: Como Estruturar Seu Projeto para Trabalhar com Claude Code, Copilot e Qualquer Assistente de IA"**.

## Stack

- **Backend:** NestJS + TypeScript + Clean Architecture
- **Storage:** In-memory (array em memória — sem banco de dados)
- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS
- **Testes:** Jest

## Como rodar

```bash
# Backend
cd backend
npm install
npm run start:dev
# API disponível em http://localhost:3001

# Frontend
cd frontend
npm install
npm run dev
# App disponível em http://localhost:3000
```

## Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /todos | Lista todos os todos |
| POST | /todos | Cria um novo todo |
| PATCH | /todos/:id/complete | Marca como concluído |
| PATCH | /todos/:id/reopen | Reabre um todo |
| DELETE | /todos/:id | Remove um todo |

## Estrutura do projeto

```
ai-ready-todo/
├── CLAUDE.md                        ← instruções para o assistente de IA
├── backend/
│   ├── src/
│   │   ├── domain/                  ← entidades, eventos, interfaces
│   │   ├── application/             ← use cases e DTOs
│   │   ├── infrastructure/          ← repositório em memória
│   │   └── interfaces/              ← controllers HTTP
│   ├── test/
│   └── docs/
│       ├── specs/                   ← especificações (Spec-Driven)
│       └── decisions/               ← ADRs
├── frontend/
│   └── src/
│       ├── app/                     ← páginas Next.js
│       ├── components/              ← componentes React
│       └── lib/                     ← api client e tipos
└── .claude/
    ├── agents/                      ← subagentes especializados
    └── skills/                      ← skills reutilizáveis
```

## Sobre o autor

**Felipe Augusto** — AI Engineer com 14 anos de experiência, certificado pela Anthropic em Claude Code, MCP, Sub-Agents e Agent Skills.

- LinkedIn: [linkedin.com/in/felipe-que-fez](https://linkedin.com/in/felipe-que-fez)
- GitHub: [github.com/FelipeQueFez](https://github.com/FelipeQueFez)
