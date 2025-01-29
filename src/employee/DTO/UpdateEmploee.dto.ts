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

export class UpdateEmployeeDto {
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

// name: employee.name,
// surname: employee.surname,
// assessable: employee.assessable,
// cpf: employee.cpf,
// sector: employee.sector,
// shift: employee.shift,
// imgProfile: employee.imgProfile,
// roleEmployeesId: employee.role,
