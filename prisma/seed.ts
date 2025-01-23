import * as PrismaTypes from '@prisma/client';
import { CAPABILITIES } from '../src/utils/constants.utils';
import UtilService from '../src/utils/utils';
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
}

main();
