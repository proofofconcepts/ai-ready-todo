# Skill: nestjs-clean-arch

## Estrutura de módulo

```
domain/entities/    → classe com factory method static create()
domain/events/      → classes simples com readonly props
domain/repositories/→ interface + Symbol export
application/use-cases/ → @Injectable, @Inject, execute(dto): Promise<Entity>
infrastructure/repositories/ → implements interface, armazena em array
interfaces/http/controllers/ → @Controller, mapeia exceções para HTTP
```

## Regras invioláveis

1. Domain NUNCA importa de infrastructure ou interfaces
2. Use cases recebem DTOs, não entidades de ORM
3. Controllers sem lógica de negócio
4. Erros específicos — nunca `new Error()` genérico
5. Repositório concreto injetado via Symbol
