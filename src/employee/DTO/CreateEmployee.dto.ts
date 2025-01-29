import { Shift } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsBoolean,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(14)
  @MaxLength(14)
  cpf: string;

  @IsNotEmpty()
  @IsEnum(Shift)
  shift?: Shift;

  @IsNotEmpty()
  @IsString()
  sector: string;

  @IsNotEmpty()
  @IsBoolean()
  assessable: boolean;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  imgProfile: string;
}
