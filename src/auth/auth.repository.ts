import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/prisma/prisma.service';
import UtilService from 'src/utils/utils';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly prisma: Prisma,
    private readonly util: UtilService,
  ) {}

  async findUserByUsername(username: string) {
    return this.prisma.user.findFirst({
      select: {
        id: true,
        username: true,
        password: true,
      },
      where: { username },
    });
  }

  async validatePassword(
    storedPassword: string,
    inputPassword: string,
  ): Promise<boolean> {
    return this.util.checkHash(inputPassword, storedPassword);
  }
}
