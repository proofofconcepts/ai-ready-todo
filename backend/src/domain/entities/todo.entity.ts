export class TodoNotFoundError extends Error {
  constructor(id: string) {
    super(`Todo ${id} not found`);
    this.name = 'TodoNotFoundError';
  }
}

export class TodoAlreadyCompletedError extends Error {
  constructor() {
    super('Todo is already completed');
    this.name = 'TodoAlreadyCompletedError';
  }
}

export class TodoAlreadyOpenError extends Error {
  constructor() {
    super('Todo is already open');
    this.name = 'TodoAlreadyOpenError';
  }
}

export class TodoTitleEmptyError extends Error {
  constructor() {
    super('Todo title cannot be empty');
    this.name = 'TodoTitleEmptyError';
  }
}

export class TodoTitleTooLongError extends Error {
  constructor() {
    super('Todo title cannot exceed 255 characters');
    this.name = 'TodoTitleTooLongError';
  }
}

export class Todo {
  constructor(
    public readonly id: string,
    public title: string,
    public completed: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(id: string, title: string): Todo {
    if (!title || title.trim().length === 0) throw new TodoTitleEmptyError();
    if (title.length > 255) throw new TodoTitleTooLongError();
    return new Todo(id, title.trim(), false, new Date(), new Date());
  }

  complete(): void {
    if (this.completed) throw new TodoAlreadyCompletedError();
    this.completed = true;
    this.updatedAt = new Date();
  }

  reopen(): void {
    if (!this.completed) throw new TodoAlreadyOpenError();
    this.completed = false;
    this.updatedAt = new Date();
  }

  updateTitle(title: string): void {
    if (!title || title.trim().length === 0) throw new TodoTitleEmptyError();
    if (title.length > 255) throw new TodoTitleTooLongError();
    this.title = title.trim();
    this.updatedAt = new Date();
  }
}
