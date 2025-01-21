import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { Prisma } from 'src/prisma/prisma.service';
import TokenService from 'src/utils/token.utils';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.TOKEN_SECRET || '',
      signOptions: { expiresIn: 60 * 60 * 8 },
    }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, Prisma, TokenService],
  exports: [AuthService],
})
export class AuthModule {}
