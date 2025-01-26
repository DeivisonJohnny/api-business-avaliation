import { Prisma } from 'src/prisma/prisma.service';
import IEmployee from './interface/IEmployee';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class EmployeeRepository {
  constructor(private readonly prisma: Prisma) {}

  async getAllEmployees(): Promise<IEmployee[]> {
    return await this.prisma.employee.findMany();
  }

  async getEmployeeByCPF(cpf: string): Promise<IEmployee> {
    return await this.prisma.employee.findUnique({ where: { cpf: cpf } });
  }

  async createEmployee(employee: IEmployee): Promise<IEmployee> {
    const { role, ...otherdData } = employee;

    return await this.prisma.employee.create({
      data: { ...otherdData, roleId: role.id },
    });
  }

  async updateAllFieldsEmployee(
    idUser: string,
    employee: IEmployee,
  ): Promise<IEmployee> {
    const { role, ...otherdData } = employee;

    return await this.prisma.employee.update({
      data: { ...otherdData, roleId: role.id },
      where: { id: idUser },
    });
  }
}
