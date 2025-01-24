import * as PrismaTypes from '@prisma/client';
import { CAPABILITIES } from '../src/utils/constants.utils';
import UtilService from '../src/utils/utils';
import IEmployee from 'src/employee/interface/IEmployee';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
const Prisma = new PrismaTypes.PrismaClient();

async function main() {
  const roles: PrismaTypes.Prisma.RoleCreateInput[] = [
    {
      id: 'administrator',
      name: 'Administrador',
      level: 1,
      capabilities: {
        connectOrCreate: CAPABILITIES.map((id) => ({
          where: { id },
          create: { id },
        })),
      },
    },
    {
      id: 'employee',
      name: 'Funcionario',
    },
  ];

  await Promise.all(
    roles.map((role) =>
      Prisma.role.upsert({
        where: { id: role.id },
        create: role,
        update: role,
      }),
    ),
  );

  const userAdmin: PrismaTypes.Prisma.UserCreateInput = {
    name: 'Deivison',
    surname: 'Johnny',
    username: 'deivisonjohnny',
    password: await new UtilService().hash('93186145'),
    roles: { connect: { id: 'administrator' } },
  };

  await Prisma.user.upsert({
    where: { username: userAdmin.username },
    create: userAdmin,
    update: userAdmin,
  });

  const rolesEmployee: PrismaTypes.Prisma.RoleEmployeesCreateInput[] = [
    { id: 'employee', name: 'Funcionario' },
    { id: 'supervisor', name: 'Supervisor' },
  ];

  await Promise.all(
    rolesEmployee.map((role) =>
      Prisma.roleEmployees.upsert({
        where: { id: role.id },
        create: role,
        update: role,
      }),
    ),
  );

  const employee: IEmployee[] = [];

  for (let i = 0; i < 30; i++) {
    employee.push({
      id: randomUUID().toString(),
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      cpf: faker.string.numeric(11),
      shift: faker.helpers.arrayElement(['morning', 'afternoon', 'night']),
      sector: faker.commerce.department(),
      assessable: false,
      imgProfile: faker.image.avatar(),
    });
  }

  await Promise.all(
    employee.map(async (employee) => {
      await Prisma.employee.upsert({
        where: { id: employee.id },
        create: {
          ...employee,
          roles: {
            connect: {
              id: faker.helpers.arrayElement(['employee', 'supervisor']),
            },
          },
        },
        update: {
          ...employee,
          roles: {
            connect: {
              id: faker.helpers.arrayElement(['employee', 'supervisor']),
            },
          },
        },
      });
    }),
  );
}

main();
