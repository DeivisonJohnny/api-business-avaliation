import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export default class UtilService {
  checkHash(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value || '', hash || '');
  }

  async hash(value: string, salt = 8): Promise<string> {
    return bcrypt.hash(value, salt);
  }
}
