import { Inject, Injectable } from '@nestjs/common';
import { Todo, TodoNotFoundError } from '../../domain/entities/todo.entity';
import { ITodoRepository, TODO_REPOSITORY } from '../../domain/repositories/todo.repository.interface';

@Injectable()
export class CompleteTodoUseCase {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepository: ITodoRepository,
  ) {}

  async execute(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) throw new TodoNotFoundError(id);
    todo.complete();
    return this.todoRepository.update(todo);
  }
}
