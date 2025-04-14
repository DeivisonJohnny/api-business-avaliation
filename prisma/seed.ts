import { PrismaClient, Shift } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  function formatCPF(cpf: string) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) {
      throw new Error('CPF inválido. O CPF deve conter 11 números.');
    }

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  // 1. Criar Capabilities
  const capabilities = await Promise.all(
    ['READ', 'WRITE', 'DELETE', 'MANAGE'].map((cap, index) =>
      prisma.capability.upsert({
        where: { id: `capability_${index + 1}` },
        update: {},
        create: {
          id: `capability_${index + 1}`,
        },
      }),
    ),
  );

  // 2. Criar RolesUser
  const adminRole = await prisma.roleUser.upsert({
    where: { id: 'administrator' },
    update: {},
    create: {
      id: 'administrator',
      name: 'Administrador',
      level: 10,
      capabilities: {
        connect: capabilities.map((cap) => ({ id: cap.id })),
      },
    },
  });

  const assistantRole = await prisma.roleUser.upsert({
    where: { id: 'assistant' },
    update: {},
    create: {
      id: 'assistant',
      name: 'Assistente',
      level: 5,
      capabilities: {
        connect: [capabilities[0]], // Apenas READ
      },
    },
  });

  // 3. Criar User Admin
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      name: 'Admin',
      surname: 'System',
      username: 'admin',
      password: await bcrypt.hash('admin123', 10),
      roles: {
        connect: { id: adminRole.id },
      },
    },
  });

  // 4. Criar Roles (para Employees)
  const employeeRole = await prisma.role.upsert({
    where: { id: 'employee' },
    update: {},
    create: {
      id: 'employee',
      name: 'Funcionário',
    },
  });

  const supervisorRole = await prisma.role.upsert({
    where: { id: 'supervisor' },
    update: {},
    create: {
      id: 'supervisor',
      name: 'Supervisor',
    },
  });

  // 5. Criar RoleEmployees
  await prisma.roleEmployees.upsert({
    where: { roleId: employeeRole.id },
    update: {},
    create: {
      roleId: employeeRole.id,
    },
  });

  await prisma.roleEmployees.upsert({
    where: { roleId: supervisorRole.id },
    update: {},
    create: {
      roleId: supervisorRole.id,
    },
  });

  // 6. Criar Sectors
  const sectors = await Promise.all(
    ['TI', 'RH', 'Financeiro', 'Produção', 'Vendas'].map((name, index) =>
      prisma.sector.upsert({
        where: { id: `sector_${index + 1}` },
        update: {},
        create: {
          id: `sector_${index + 1}`,
          name,
        },
      }),
    ),
  );

  // 7. Criar Employees
  for (let i = 0; i < 30; i++) {
    const sector = faker.helpers.arrayElement(sectors);
    const role = faker.helpers.arrayElement([employeeRole, supervisorRole]);
    const shifts: Shift[] = ['MANHÃ', 'TARDE', 'NOITE'];

    await prisma.employee.upsert({
      where: { cpf: `000000000${i.toString().padStart(2, '0')}` },
      update: {},
      create: {
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        cpf: formatCPF(`000000000${i.toString().padStart(2, '0')}`),
        shift: faker.helpers.arrayElement(shifts),
        assessable: faker.datatype.boolean(),
        imgProfile: faker.image.avatar(),
        sector: {
          connect: { id: sector.id },
        },
        rolesEmployee: {
          connect: { roleId: role.id },
        },
      },
    });
  }

  // 8. Criar algumas Avaliations
  const users = await prisma.user.findMany();
  const employees = await prisma.employee.findMany();

  for (let i = 0; i < 50; i++) {
    const user = faker.helpers.arrayElement(users);
    const employee = faker.helpers.arrayElement(employees);

    await prisma.avaliations.create({
      data: {
        employee: {
          connect: { id: employee.id },
        },
        score: faker.number.float({ min: 1, max: 10 }),
        comment: faker.lorem.sentence(),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
