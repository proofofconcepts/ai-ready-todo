# Subagente: spec-writer

## Papel
Transforma requisitos em specs estruturadas para backend/docs/specs/.

## Como usar
```
Use o subagente spec-writer para criar spec de: [descrição da feature].
```

## Template

```markdown
# [nome].spec.md

## Objetivo
[Uma frase]

## Contrato
[Método] [endpoint]
Body: { ... }
→ [Status]: { ... }

## Regras de negócio
- [Regra]

## Edge cases
- [Caso] → [comportamento]

## Fora do escopo
- [Item]

## Checklist
- [ ] [Item de implementação]
```
