import { Controller, Get } from '@nestjs/common';
import EmployeeService from './employee.service';
import IEmployee from './interface/IEmployee';

@Controller('employee')
export default class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getListAllEmployees(): Promise<IEmployee[]> {
    return await this.employeeService.getAll();
  }
}
