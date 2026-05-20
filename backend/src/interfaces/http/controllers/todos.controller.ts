import {
  Body, Controller, Delete, Get, HttpCode,
  Inject, NotFoundException, ConflictException,
  BadRequestException, Param, Patch, Post,
} from '@nestjs/common';
import { CreateTodoUseCase } from '../../../application/use-cases/create-todo.use-case';
import { CompleteTodoUseCase } from '../../../application/use-cases/complete-todo.use-case';
import { ReopenTodoUseCase } from '../../../application/use-cases/reopen-todo.use-case';
import { CreateTodoDto } from '../../../application/dtos/todo.dto';
import { ITodoRepository, TODO_REPOSITORY } from '../../../domain/repositories/todo.repository.interface';
import {
  TodoNotFoundError,
  TodoAlreadyCompletedError,
  TodoAlreadyOpenError,
  TodoTitleEmptyError,
  TodoTitleTooLongError,
} from '../../../domain/entities/todo.entity';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly createTodoUseCase: CreateTodoUseCase,
    private readonly completeTodoUseCase: CompleteTodoUseCase,
    private readonly reopenTodoUseCase: ReopenTodoUseCase,
    @Inject(TODO_REPOSITORY)
    private readonly todoRepository: ITodoRepository,
  ) {}

  @Get()
  findAll() {
    return this.todoRepository.findAll();
  }

  @Post()
  async create(@Body() dto: CreateTodoDto) {
    try {
      return await this.createTodoUseCase.execute(dto);
    } catch (e) {
      if (e instanceof TodoTitleEmptyError || e instanceof TodoTitleTooLongError)
        throw new BadRequestException(e.message);
      throw e;
    }
  }

  @Patch(':id/complete')
  async complete(@Param('id') id: string) {
    try {
      return await this.completeTodoUseCase.execute(id);
    } catch (e) {
      if (e instanceof TodoNotFoundError) throw new NotFoundException(e.message);
      if (e instanceof TodoAlreadyCompletedError) throw new ConflictException(e.message);
      throw e;
    }
  }

  @Patch(':id/reopen')
  async reopen(@Param('id') id: string) {
    try {
      return await this.reopenTodoUseCase.execute(id);
    } catch (e) {
      if (e instanceof TodoNotFoundError) throw new NotFoundException(e.message);
      if (e instanceof TodoAlreadyOpenError) throw new ConflictException(e.message);
      throw e;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const todo = await this.todoRepository.findById(id);
    if (!todo) throw new NotFoundException(`Todo ${id} not found`);
    await this.todoRepository.delete(id);
  }
}
