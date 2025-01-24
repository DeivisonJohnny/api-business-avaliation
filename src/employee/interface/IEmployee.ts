import * as PrismaTypes from '@prisma/client';

export default interface IEmployee {
  id?: string;
  name: string;
  surname: string;
  cpf: string;
  shift: string;
  sector: string;
  assessable: boolean;
  roles?:
    | PrismaTypes.Role
    | PrismaTypes.Prisma.RoleEmployeesCreateNestedOneWithoutEmployeeInput;
  imgProfile: string;
}
