import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/prisma/prisma.service';
import Util from '../utils/Util';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: Prisma) {}

  async findUserByUsername(username: string) {
    return this.prisma.user.findFirst({
      select: {
        id: true,
        username: true,
        password: true,
        name: true,
        surname: true,
        role: true,
      },
      where: { username },
    });
  }

  async validatePassword(
    storedPassword: string,
    inputPassword: string,
  ): Promise<boolean> {
    return Util.checkHash(inputPassword, storedPassword);
  }
}
