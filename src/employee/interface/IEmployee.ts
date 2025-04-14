import { RoleEmployees, Sector, Shift } from '@prisma/client';

export default interface IEmployee {
  id?: string;
  name: string;
  surname: string;
  cpf: string;
  shift?: Shift;
  sector?: Partial<Sector>;
  sectorId?: string;
  assessable: boolean;
  roleEmployeesId: string;
  rolesEmployee: RoleEmployees | RoleEmployees[];
  imgProfile: string;
}
