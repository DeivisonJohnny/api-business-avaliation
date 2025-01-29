import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import EmployeeRepository from './employee.repository';
import IEmployee from './interface/IEmployee';
import { RoleEmployeeService } from 'src/role-employees/role-employee.service';
import { UpdateEmployeeDto } from './DTO/UpdateEmploee.dto';
import { CreateEmployeeDto } from './DTO/CreateEmployee.dto';

@Injectable()
export default class EmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly roleService: RoleEmployeeService,
  ) {}

  async getAll(): Promise<IEmployee[]> {
    try {
      return await this.employeeRepository.getAllEmployees();
    } catch (error) {
      throw new Error('Unexpected error --> ' + error);
    }
  }

  async getById(cpf: string): Promise<IEmployee> {
    const employee = await this.employeeRepository.getEmployeeByCPF(cpf);

    if (!employee) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
    return employee;
  }

  async create(employeeData: CreateEmployeeDto): Promise<Partial<IEmployee>> {
    const userCpf = await this.employeeRepository.getEmployeeByCPF(
      employeeData.cpf,
    );

    if (userCpf) {
      throw new HttpException(
        'CPF informed already registered',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    const role = await this.roleService.getById(employeeData.role);

    if (!role) {
      throw new HttpException(
        'The role was not received or is incorrect',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    try {
      return await this.employeeRepository.createEmployee({
        ...employeeData,
        role: role.id,
      });
    } catch (error) {
      throw new Error('Unexpected error - - -> ' + error);
    }
  }

  async update(
    cpf: string,
    employeeData: UpdateEmployeeDto,
  ): Promise<IEmployee> {
    if (!cpf) {
      throw new HttpException('CPF is required', HttpStatus.BAD_REQUEST);
    }

    const user = await this.employeeRepository.getEmployeeByCPF(cpf);

    if (!user) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }

    const role = await this.roleService.getById(employeeData.role);

    if (!role) {
      throw new HttpException(
        'The role was not received or is incorrect',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    try {
      return await this.employeeRepository.updateEmployee(user.id, {
        ...employeeData,
        role: role.id,
      });
    } catch (error) {
      throw new Error('Unexpected error - - -> ' + error);
    }
  }
}
