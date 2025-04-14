import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import EmployeeService from './employee.service';
import IEmployee from './interface/IEmployee';
import { CreateEmployeeDto } from './DTO/CreateEmployee.dto';
import { UpdateEmployeeDto } from './DTO/UpdateEmploee.dto';
import UtilService from 'src/utils/utils';
@Controller('employee')
export default class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly utilsService: UtilService,
  ) {}

  @Get()
  async getListAllEmployees(): Promise<IEmployee[]> {
    return await this.employeeService.getAll();
  }

  @Get(':identification')
  async getEmployeeByCPF(
    @Param('identification') identification: string,
  ): Promise<IEmployee> {
    identification = this.utilsService.formatCPF(identification);
    return await this.employeeService.getByIdentification(identification);
  }

  @Post()
  async createNewEmployee(@Body() data: CreateEmployeeDto): Promise<{
    message: string;
    statusCode: number;
    data: Partial<IEmployee>;
  }> {
    data.cpf = this.utilsService.removeFormatCpf(data.cpf);
    const response = await this.employeeService.create(data);
    return {
      message: 'Employee registed with sucessfull',
      statusCode: 201,
      data: response,
    };
  }

  @Put(':cpf')
  async updateEmployee(
    @Param('cpf') cpf: string,
    @Body() data: UpdateEmployeeDto,
  ): Promise<{
    message: string;
    statusCode: number;
    data: Partial<IEmployee>;
  }> {
    const response = await this.employeeService.update(cpf, data);
    return {
      message: 'Employee updated with sucessfull',
      statusCode: 200,
      data: response,
    };
  }
}
