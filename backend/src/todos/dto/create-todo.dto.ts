import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

import { Statuses } from "../types";

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEnum(Statuses)
  @IsNotEmpty()
  status: Statuses;
}
