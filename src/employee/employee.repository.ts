import { Prisma } from 'src/prisma/prisma.service';
import IEmployee from './interface/IEmployee';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class EmployeeRepository {
  constructor(private readonly prisma: Prisma) {}

  async getAllEmployees(): Promise<IEmployee[]> {
    return await this.prisma.employee.findMany();
  }
}
