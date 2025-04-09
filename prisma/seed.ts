import * as PrismaTypes from '@prisma/client';
import { CAPABILITIES } from '../src/utils/constants.utils';
import UtilService from '../src/utils/utils';
import IEmployee from 'src/employee/interface/IEmployee';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
const Prisma = new PrismaTypes.PrismaClient();

async function main() {
  const rolesUser: PrismaTypes.Prisma.RoleUserCreateInput[] = [
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
      id: 'assistant',
      name: 'Assistente',
    },
  ];

  await Promise.all(
    rolesUser.map((role) =>
      Prisma.roleUser.upsert({
        where: {
          id: faker.helpers.arrayElement(['administrator', 'assistant']),
        },
        update: role,
        create: role,
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
    update: userAdmin,
    create: userAdmin,
  });

  const roleForEmployees: PrismaTypes.Prisma.RoleCreateInput[] = [
    { id: 'employee', name: 'Funcionario' },
    { id: 'supervisor', name: 'Supervisor' },
  ];

  await Promise.all(
    roleForEmployees.map((role) =>
      Prisma.role.upsert({
        where: { id: role.id },
        update: role,
        create: role,
      }),
    ),
  );

  const employee: Partial<IEmployee>[] = [];

  for (let i = 0; i < 30; i++) {
    employee.push({
      id: randomUUID().toString(),
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      cpf: faker.string.numeric(11),
      shift: faker.helpers.arrayElement(Object.values(PrismaTypes.Shift)),
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
          id: employee.id,
          name: employee.name,
          surname: employee.surname,
          cpf: employee.cpf,
          shift: employee.shift,
          sectorId: employee.sector,
          assessable: employee.assessable,
          imgProfile: employee.imgProfile,
        },
        update: {
          id: employee.id,
          name: employee.name,
          surname: employee.surname,
          cpf: employee.cpf,
          shift: employee.shift,
          sectorId: employee.sector,
          assessable: employee.assessable,
          imgProfile: employee.imgProfile,
        },
      });
    }),
  );

  await Promise.all(
    roleForEmployees.map((role) =>
      Prisma.roleEmployees.upsert({
        where: {
          roleId: role.id,
        },
        create: {
          roleId: role.id,
        },
        update: {
          roleId: role.id,
        },
      }),
    ),
  );

  await Promise.all(
    employee.map((employee) =>
      Prisma.employee.update({
        data: {
          rolesEmployee: {
            connect: {
              roleId: faker.helpers.arrayElement(['employee', 'supervisor']),
            },
          },
        },
        where: { id: employee.id },
      }),
    ),
  );
}

main();
