/* eslint-disable no-console,@typescript-eslint/no-floating-promises */
import { writeFileSync } from "fs";

import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as yaml from "js-yaml";

import { AppModule } from "./app.module";
import { TodosModule } from "./todos/todos.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Todos example")
    .setDescription("The todos API description")
    .setVersion("1.0")
    .addTag("todos")
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [TodosModule],
  });
  SwaggerModule.setup("api", app, document);

  const yamlString = yaml.dump(document);
  writeFileSync("../openApi.yaml", yamlString);
  console.log("✅ OpenAPI YAML file generated as openApi.yaml.");

  await app.listen(3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
