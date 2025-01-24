import { RoleEmployees, Shift } from '@prisma/client';

export default interface IEmployee {
  id?: string;
  name: string;
  surname: string;
  cpf: string;
  shift?: Shift;
  sector: string;
  assessable: boolean;
  role?: RoleEmployees;
  imgProfile: string;
}
