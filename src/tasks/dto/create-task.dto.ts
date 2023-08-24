import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  createdDate: Date;
}
