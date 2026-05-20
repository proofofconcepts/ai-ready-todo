# Skill: nextjs-conventions

## Estrutura

```
app/layout.tsx      → layout raiz
app/page.tsx        → página principal (Server Component)
components/         → Client Components com 'use client'
lib/types.ts        → interfaces TypeScript
lib/api.ts          → funções fetch para o backend
```

## Regras inviolárias

1. Tipos em lib/types.ts — nunca inline
2. Fetch sempre em lib/api.ts — nunca no componente
3. Server Components por padrão — 'use client' só quando necessário
4. Variáveis de ambiente do cliente: prefixo NEXT_PUBLIC_
5. Sem `any` no TypeScript
