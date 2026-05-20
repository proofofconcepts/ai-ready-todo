import { Todo, TodoAlreadyCompletedError, TodoAlreadyOpenError, TodoTitleEmptyError, TodoTitleTooLongError } from '../../src/domain/entities/todo.entity';

describe('Todo entity', () => {
  describe('create', () => {
    it('should create todo with valid title', () => {
      const todo = Todo.create('123', 'Buy groceries');
      expect(todo.title).toBe('Buy groceries');
      expect(todo.completed).toBe(false);
      expect(todo.id).toBe('123');
    });

    it('should trim title on creation', () => {
      const todo = Todo.create('123', '  Buy groceries  ');
      expect(todo.title).toBe('Buy groceries');
    });

    it('should throw when title is empty', () => {
      expect(() => Todo.create('123', '')).toThrow(TodoTitleEmptyError);
    });

    it('should throw when title is only spaces', () => {
      expect(() => Todo.create('123', '   ')).toThrow(TodoTitleEmptyError);
    });

    it('should throw when title exceeds 255 characters', () => {
      expect(() => Todo.create('123', 'a'.repeat(256))).toThrow(TodoTitleTooLongError);
    });

    it('should accept title with exactly 255 characters', () => {
      const todo = Todo.create('123', 'a'.repeat(255));
      expect(todo.title).toHaveLength(255);
    });
  });

  describe('complete', () => {
    it('should complete an open todo', () => {
      const todo = Todo.create('123', 'Buy groceries');
      todo.complete();
      expect(todo.completed).toBe(true);
    });

    it('should throw when todo is already completed', () => {
      const todo = Todo.create('123', 'Buy groceries');
      todo.complete();
      expect(() => todo.complete()).toThrow(TodoAlreadyCompletedError);
    });
  });

  describe('reopen', () => {
    it('should reopen a completed todo', () => {
      const todo = Todo.create('123', 'Buy groceries');
      todo.complete();
      todo.reopen();
      expect(todo.completed).toBe(false);
    });

    it('should throw when todo is already open', () => {
      const todo = Todo.create('123', 'Buy groceries');
      expect(() => todo.reopen()).toThrow(TodoAlreadyOpenError);
    });
  });
});
