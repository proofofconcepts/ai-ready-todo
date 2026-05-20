import { Injectable } from '@nestjs/common';
import { Todo } from '../../domain/entities/todo.entity';
import { ITodoRepository } from '../../domain/repositories/todo.repository.interface';

@Injectable()
export class InMemoryTodoRepository implements ITodoRepository {
  private todos: Todo[] = [];

  async findAll(): Promise<Todo[]> {
    return [...this.todos];
  }

  async findById(id: string): Promise<Todo | null> {
    return this.todos.find((t) => t.id === id) ?? null;
  }

  async save(todo: Todo): Promise<Todo> {
    this.todos.push(todo);
    return todo;
  }

  async update(todo: Todo): Promise<Todo> {
    const index = this.todos.findIndex((t) => t.id === todo.id);
    if (index !== -1) this.todos[index] = todo;
    return todo;
  }

  async delete(id: string): Promise<void> {
    this.todos = this.todos.filter((t) => t.id !== id);
  }
}
