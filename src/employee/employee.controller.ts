import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import EmployeeService from './employee.service';
import IEmployee from './interface/IEmployee';

@Controller('employee')
export default class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getListAllEmployees(): Promise<IEmployee[]> {
    return await this.employeeService.getAll();
  }

  @Post()
  async createNewEmployee(@Body() data: IEmployee): Promise<object> {
    const response = await this.employeeService.create(data);
    return {
      message: 'Employee registed with sucessfull',
      statusCode: 201,
      data: response,
    };
  }

  @Put()
  async updateEmployee(@Body() data: IEmployee): Promise<object> {
    const response = await this.employeeService.update(data);
    return {
      message: 'Employee updated with sucessfull',
      statusCode: 200,
      data: response,
    };
  }
}
