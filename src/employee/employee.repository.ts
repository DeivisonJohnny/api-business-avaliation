import { Prisma } from 'src/prisma/prisma.service';
import IEmployee from './interface/IEmployee';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class EmployeeRepository {
  constructor(private readonly prisma: Prisma) {}

  async getAllEmployees(): Promise<IEmployee[]> {
    return await this.prisma.employee.findMany();
  }

  async getEmployeByCPF(cpf: string): Promise<IEmployee> {
    return await this.prisma.employee.findUnique({ where: { cpf: cpf } });
  }

  async createEmployee(employee: IEmployee): Promise<IEmployee> {
    try {
      const { role, ...otherdData } = employee;

      return await this.prisma.employee.create({
        data: { ...otherdData, roleId: role.id },
      });
    } catch (error) {
      console.log('🚀 ~ EmployeeRepository ~ createEmployee ~ error:', error);
      throw new Error('Erro inesperado - ->' + error);
    }
  }
}
