import { Prisma } from 'src/prisma/prisma.service';
import IEmployee from './interface/IEmployee';
import { Injectable } from '@nestjs/common';
import { UpdateEmployeeDto } from './DTO/UpdateEmploee.dto';
import { CreateEmployeeDto } from './DTO/CreateEmployee.dto';

@Injectable()
export default class EmployeeRepository {
  constructor(private readonly prisma: Prisma) {}

  async getAllEmployees(): Promise<IEmployee[]> {
    return await this.prisma.employee.findMany({
      include: { rolesEmployee: { include: { roles: true } } },
    });
  }

  async getEmployeeByCPF(cpf: string): Promise<IEmployee> {
    return await this.prisma.employee.findUnique({
      where: { cpf: cpf },
      include: {
        rolesEmployee: { include: { roles: true } },
      },
    });
  }

  async createEmployee(employee: CreateEmployeeDto): Promise<IEmployee> {
    return await this.prisma.employee.create({
      data: {
        name: employee.name,
        surname: employee.surname,
        assessable: employee.assessable,
        cpf: employee.cpf,
        sector: employee.sector,
        shift: employee.shift,
        imgProfile: employee.imgProfile,
        roleEmployeesId: employee.role,
      },
      include: { rolesEmployee: { include: { roles: true } } },
    });
  }

  async updateEmployee(
    idUser: string,
    employee: UpdateEmployeeDto,
  ): Promise<IEmployee> {
    return await this.prisma.employee.update({
      where: { id: idUser },
      data: {
        name: employee.name,
        surname: employee.surname,
        assessable: employee.assessable,
        cpf: employee.cpf,
        sector: employee.sector,
        shift: employee.shift,
        imgProfile: employee.imgProfile,
        roleEmployeesId: employee.role,
      },
      include: { rolesEmployee: { include: { roles: true } } },
    });
  }
}
