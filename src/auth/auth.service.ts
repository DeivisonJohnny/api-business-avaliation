import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { IAuthLogin } from './interfaces/IAuth-login';
import TokenService from 'src/utils/token.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly token: TokenService,
  ) {}

  async login({ username, password }: IAuthLogin) {
    const user = await this.authRepository.findUserByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Username invalid');
    }

    const isPasswordValid = await this.authRepository.validatePassword(
      user.password,
      password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Password invalid', HttpStatus.UNAUTHORIZED);
    }

    const token = this.token.create({ username: user.username });

    return {
      message: 'Login successful',
      token: token,
      expiresIn: 60 * 60 * 8,
    };
  }
}
