import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import TokenService from 'src/utils/token.utils';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly token: TokenService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const tokenReq = req.headers['authorization']?.replace('Bearer ', '');

    if (req.path === '/auth/login') {
      return next();
    }

    if (!tokenReq) {
      throw new HttpException(
        'Token não foi enviado na requisição',
        HttpStatus.UNAUTHORIZED,
      );
    }

    this.token.verify(tokenReq);

    next();
  }
}
