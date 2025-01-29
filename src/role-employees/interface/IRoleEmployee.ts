import { Employee, Role } from '@prisma/client';

export interface IRoleEmployee {
  id?: string;
  employees: Employee | Employee[];
  roleId: string;
  roles: Role;
}

// {
// 	"id": "56e0c618-a468-4e46-be90-d8053ff961a9",
// 	"roles": {
// 		"id": "employee",
// 		"name": "Funcionario"
// 	}
// }
