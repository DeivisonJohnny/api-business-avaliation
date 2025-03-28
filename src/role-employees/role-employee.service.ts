import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import RoleEmployeeRepository from './role-employee.repository';
import { IRoleEmployee } from './interface/IRoleEmployee';
import { IRole } from './interface/IRole';

@Injectable()
export class RoleEmployeeService {
  constructor(private readonly roleEmployee: RoleEmployeeRepository) {}

  async create(data: IRole): Promise<IRole> {
    const roleReplace = data.name.toLowerCase().replace(' ', '');

    const roleExists = await this.roleEmployee.getRoleById(roleReplace);

    if (roleExists) {
      throw new HttpException(
        'Role already registered',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    try {
      const role = await this.roleEmployee.createNewRoleOfEmployee({
        id: roleReplace,
        name: data.name,
      });

      await this.roleEmployee.createNewRoleEmployee(role.id);

      return role;
    } catch (error) {
      console.log('🚀 ~ Erro inesperado ao criar role:', error);
      throw new Error('Erro inesperado  --> ' + error);
    }
  }

  async getAll(): Promise<Partial<IRoleEmployee>[]> {
    return await this.roleEmployee.getAllRoles();
  }

  async getById(id: string): Promise<Partial<IRoleEmployee>> {
    const roleReplace = id.toLowerCase().replace(' ', '');

    const role = await this.roleEmployee.getRoleById(roleReplace);
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return role;
  }
}
