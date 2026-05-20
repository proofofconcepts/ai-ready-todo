# complete-todo.spec.md

## Objetivo
Marcar uma tarefa como concluída.

## Contrato
PATCH /todos/:id/complete
→ 200: { id, title, completed: true, updatedAt: <agora> }

## Regras de negócio
- Todo deve existir → 404 se não encontrado
- Não completar um todo já completado → 409 Conflict
- updatedAt atualizado para o momento da operação

## Edge cases
- ID inexistente → 404
- Todo já completado → 409

## Checklist
- [x] Método complete() na entidade Todo
- [x] CompleteTodoUseCase
- [x] PATCH /todos/:id/complete no controller
- [x] Teste unitário — fluxo feliz
- [x] Teste unitário — já completado
