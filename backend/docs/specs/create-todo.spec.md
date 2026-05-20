# create-todo.spec.md

## Objetivo
Permitir que o usuário crie uma nova tarefa.

## Contrato
POST /todos
Body: { title: string }
→ 201: { id, title, completed: false, createdAt, updatedAt }

## Regras de negócio
- Título obrigatório — 400 se vazio ou só espaços
- Máximo 255 caracteres — 400 se exceder
- Trim aplicado antes de salvar
- completed sempre false na criação
- id gerado pelo backend (UUID v4)

## Edge cases
- Título só com espaços → 400
- Título com 256 chars → 400
- Título com 255 chars → 201
- Request sem body → 400

## Fora do escopo
- Autenticação
- Categorias e prioridades

## Checklist
- [x] Entidade Todo com validação
- [x] CreateTodoUseCase
- [x] POST /todos no controller
- [ ] Teste unitário do use case
- [x] Teste unitário da entidade
