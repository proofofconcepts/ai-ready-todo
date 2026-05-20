import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Todo } from '../../domain/entities/todo.entity';
import { ITodoRepository, TODO_REPOSITORY } from '../../domain/repositories/todo.repository.interface';
import { CreateTodoDto } from '../dtos/todo.dto';

@Injectable()
export class CreateTodoUseCase {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepository: ITodoRepository,
  ) {}

  async execute(dto: CreateTodoDto): Promise<Todo> {
    const todo = Todo.create(randomUUID(), dto.title);
    return this.todoRepository.save(todo);
  }
}
