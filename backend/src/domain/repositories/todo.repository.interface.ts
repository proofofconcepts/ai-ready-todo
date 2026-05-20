import { Todo } from '../entities/todo.entity';

export interface ITodoRepository {
  findAll(): Promise<Todo[]>;
  findById(id: string): Promise<Todo | null>;
  save(todo: Todo): Promise<Todo>;
  update(todo: Todo): Promise<Todo>;
  delete(id: string): Promise<void>;
}

export const TODO_REPOSITORY = Symbol('ITodoRepository');
