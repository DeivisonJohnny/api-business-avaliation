import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import EmployeeRepository from './employee.repository';
import IEmployee from './interface/IEmployee';

@Injectable()
export default class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async getAll(): Promise<IEmployee[]> {
    try {
      return await this.employeeRepository.getAllEmployees();
    } catch (error) {
      throw new Error('Unexpected error --> ' + error);
    }
  }

  async create(employeeData: IEmployee): Promise<IEmployee> {
    const userCpf = await this.employeeRepository.getEmployeByCPF(
      employeeData.cpf,
    );

    if (userCpf) {
      throw new HttpException(
        'CPF informed already registered',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    try {
      return await this.employeeRepository.createEmployee(employeeData);
    } catch (error) {
      throw new Error('Unexpected error - - -> ' + error);
    }
  }
}
