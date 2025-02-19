import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";

import { Statuses } from "../types";

@Entity()
export class Todo {
  @ObjectIdColumn()
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The id of the todo task",
  })
  /**
   * The id of the Todo
   * @example 550e8400-e29b-41d4-a716-446655440000
   */
  id: string;

  @Column()
  @ApiProperty({
    example: "Get groceries",
    description: "The name of the todo task",
  })
  /**
   * The name of the task
   * @example Get groceries
   */
  name: string;

  @CreateDateColumn()
  @ApiProperty({
    example: "",
    description: "The creation date of the todo task",
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    example: "",
    description: "The update date of the todo task",
  })
  updatedAt: Date;

  @Column({
    type: "enum",
    enum: Statuses,
  })
  @ApiProperty({
    example: "ready_to_start",
    description: "Status of the todo task",
    enum: Statuses,
  })
  status: Statuses;
}
