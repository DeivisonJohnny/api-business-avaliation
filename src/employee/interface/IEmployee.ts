import { Role } from '@prisma/client';

export default interface IEmployee {
  id?: string;
  name: string;
  surname: string;
  cpf: string;
  shift: string;
  sector: string;
  assessable: boolean;
  roles?: Role;
  imgProfile: string;
}
