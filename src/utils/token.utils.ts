import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class TokenService {
  private readonly tokenSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.tokenSecret = this.configService.get<string>(
      'TOKEN_SECRET',
      'SEMCHAVE',
    );
  }
  create(
    payload: Record<string, unknown>,
    options?: { expiresIn: number },
  ): string {
    return this.jwtService.sign(payload, options);
  }

  getData<T extends object>(token: string): T {
    try {
      return this.jwtService.verify<T>(token, { secret: this.tokenSecret });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new HttpException(
          'Token expirado, faça login novamente',
          HttpStatus.UNAUTHORIZED,
        );
      }
      throw new HttpException(
        'Token inválido, faça login novamente',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
