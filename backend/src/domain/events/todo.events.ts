export class TodoCreatedEvent {
  constructor(
    public readonly todoId: string,
    public readonly title: string,
    public readonly occurredAt: Date = new Date(),
  ) {}
}

export class TodoCompletedEvent {
  constructor(
    public readonly todoId: string,
    public readonly occurredAt: Date = new Date(),
  ) {}
}

export class TodoReopenedEvent {
  constructor(
    public readonly todoId: string,
    public readonly occurredAt: Date = new Date(),
  ) {}
}

export class TodoDeletedEvent {
  constructor(
    public readonly todoId: string,
    public readonly occurredAt: Date = new Date(),
  ) {}
}
