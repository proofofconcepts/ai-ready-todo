import { Module } from '@nestjs/common';
import { TODO_REPOSITORY } from './domain/repositories/todo.repository.interface';
import { InMemoryTodoRepository } from './infrastructure/repositories/in-memory-todo.repository';
import { CreateTodoUseCase } from './application/use-cases/create-todo.use-case';
import { CompleteTodoUseCase } from './application/use-cases/complete-todo.use-case';
import { ReopenTodoUseCase } from './application/use-cases/reopen-todo.use-case';
import { TodosController } from './interfaces/http/controllers/todos.controller';

@Module({
  controllers: [TodosController],
  providers: [
    { provide: TODO_REPOSITORY, useClass: InMemoryTodoRepository },
    CreateTodoUseCase,
    CompleteTodoUseCase,
    ReopenTodoUseCase,
  ],
})
export class AppModule {}
