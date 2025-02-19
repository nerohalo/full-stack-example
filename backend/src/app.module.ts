import { join } from "path";

import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Todo } from "./todos/entities/todo.entity";
import { TodosModule } from "./todos/todos.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      database: "test",
      entities: [Todo],
      synchronize: true,
    }),
    TodosModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../..", "frontend/build/client"),
    }),
  ],
})
export class AppModule {}
