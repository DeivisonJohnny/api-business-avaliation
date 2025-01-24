import { Injectable } from '@nestjs/common';
import EmployeeRepository from './employee.repository';
import IEmployee from './interface/IEmployee';

@Injectable()
export default class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async getAll(): Promise<IEmployee[]> {
    try {
      return await this.employeeRepository.getAllEmployees();
    } catch (error) {
      throw new Error('Erro inesperado --> ' + error);
    }
  }
}
