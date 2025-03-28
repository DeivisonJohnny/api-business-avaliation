import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/prisma/prisma.service';
import { IRoleEmployee } from './interface/IRoleEmployee';
import { IRole } from './interface/IRole';

@Injectable()
export default class RoleEmployeeRepository {
  constructor(private readonly prisma: Prisma) {}

  async createNewRoleOfEmployee(role: IRole): Promise<IRole> {
    return await this.prisma.role.create({ data: role });
  }

  async getRoleById(id: string): Promise<Partial<IRoleEmployee>> {
    return await this.prisma.roleEmployees.findUnique({
      where: { roleId: id },
      select: { id: true, roles: true, employee: true },
    });
  }

  async getAllRoles(): Promise<Partial<IRoleEmployee>[]> {
    return await this.prisma.roleEmployees.findMany({
      select: { id: true, roles: true },
    });
  }

  async createNewRoleEmployee(idRole: string): Promise<Partial<IRoleEmployee>> {
    return await this.prisma.roleEmployees.create({ data: { roleId: idRole } });
  }

  // async getRoleEmployeeById(idRole: string) {
  //   return await this.prisma.roleEmployees.findUnique({
  //     where: { roleId: idRole },
  //   });
  // }
}
