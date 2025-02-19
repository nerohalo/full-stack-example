import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";

import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./entities/todo.entity";

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: MongoRepository<Todo>
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.name = createTodoDto.name;
    todo.status = createTodoDto.status;

    return this.todoRepository.save(todo);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    await this.todoRepository.update(id, updateTodoDto);

    return this.todoRepository[id];
  }

  findAll(): Promise<Array<Todo>> {
    return this.todoRepository.find();
  }

  findOne(id: number): Promise<Todo> {
    return this.todoRepository[id];
  }

  async remove(id: string): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
