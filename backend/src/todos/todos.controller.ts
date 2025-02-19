import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./entities/todo.entity";
import { TodosService } from "./todos.service";

@ApiBearerAuth()
@ApiTags("todos")
@Controller("api/todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ operationId: "createTodo" })
  @ApiResponse({
    status: 200,
    description: "The created record",
    type: Todo,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid response",
    schema: {
      type: "object",
      properties: {
        errors: {
          type: "array",
          items: {
            type: "object",
            properties: {
              key: {
                type: "string",
              },
              context: {
                type: "object",
                properties: {
                  inputName: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  @Patch(":id")
  @ApiOperation({ operationId: "updateTodo" })
  @ApiResponse({
    status: 200,
    description: "The created record",
    type: Todo,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid response",
    schema: {
      type: "object",
      properties: {
        errors: {
          type: "array",
          items: {
            type: "object",
            properties: {
              key: {
                type: "string",
              },
              context: {
                type: "object",
                properties: {
                  inputName: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  update(
    @Param("id") id: string,
    @Body()
    updateTodoDto: UpdateTodoDto
  ): Promise<Todo> {
    return this.todosService.update(id, updateTodoDto);
  }

  @Get(":id")
  @ApiOperation({ operationId: "getTodo" })
  @ApiResponse({
    status: 201,
    description: "The found record",
    type: Todo,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid response",
    schema: {
      type: "object",
      properties: {
        errors: {
          type: "array",
          items: {
            type: "object",
            properties: {
              key: {
                type: "string",
              },
              context: {
                type: "object",
                properties: {
                  inputName: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Not found",
    schema: {
      type: "object",
      properties: {
        errors: {
          type: "array",
          items: {
            type: "object",
            properties: {
              key: {
                type: "string",
              },
              context: {
                type: "object",
                properties: {
                  inputName: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Internal Server Error",
    schema: {
      type: "object",
      properties: {},
    },
  })
  findOne(@Param("id") id: string): Promise<Todo> {
    return this.todosService.findOne(+id);
  }

  @Get()
  @ApiOperation({ operationId: "getTodos" })
  @ApiResponse({
    status: 200,
    description: "The found records",
    type: [Todo],
  })
  @ApiResponse({
    status: 500,
    description: "Internal Server Error",
    schema: {
      type: "object",
      properties: {},
    },
  })
  findAll(): Promise<Array<Todo>> {
    return this.todosService.findAll();
  }

  @Delete(":id")
  @ApiOperation({ operationId: "deleteTodo" })
  remove(@Param("id") id: string): Promise<void> {
    return this.todosService.remove(id);
  }
}
