import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleEmployeeService } from './role-employee.service';
import { IRoleEmployee } from './interface/IRoleEmployee';
import { IRole } from './interface/IRole';

@Controller('role-employee')
export class RoleEmployeeController {
  constructor(private readonly roleEmployeeService: RoleEmployeeService) {}

  @Post()
  async createNewRoleEmployee(
    @Body() data: IRole,
  ): Promise<{ message: string; statusCode: number; data: Partial<IRole> }> {
    const response = await this.roleEmployeeService.create(data);

    return {
      message: 'Role of employee created with successful',
      statusCode: 201,
      data: response,
    };
  }

  @Get()
  async getListAllRoleEmployee(): Promise<Partial<IRoleEmployee>[]> {
    return await this.roleEmployeeService.getAll();
  }

  @Get(':id')
  async getRoleByid(@Param('id') id: string): Promise<{
    message: string;
    statusCode: number;
    data: Partial<IRoleEmployee>;
  }> {
    const response = await this.roleEmployeeService.getById(id);

    return { message: 'Operation successful', statusCode: 200, data: response };
  }
}
