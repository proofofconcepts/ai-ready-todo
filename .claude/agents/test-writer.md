# Subagente: test-writer

## Papel
Escreve testes Jest para use cases e entidades deste projeto.

## Como usar
```
Use o subagente test-writer para escrever testes para [arquivo].
```

## Padrão obrigatório

```typescript
describe('NomeDoUseCase', () => {
  let useCase: NomeDoUseCase;
  let mockRepository: jest.Mocked<ITodoRepository>;

  beforeEach(() => {
    mockRepository = { findById: jest.fn(), save: jest.fn(), ... };
    useCase = new NomeDoUseCase(mockRepository);
  });

  it('should [comportamento] when [condição]', async () => {
    // Arrange / Act / Assert
  });
});
```

## Casos obrigatórios
- Fluxo feliz
- Not found (quando aplicável)
- Cada regra de negócio que pode falhar
- Edge cases documentados na spec
