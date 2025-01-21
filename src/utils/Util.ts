import * as bcrypt from 'bcryptjs';

export default class Util {
  static checkHash(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value || '', hash || '');
  }

  static async hash(value: string, salt = 8): Promise<string> {
    return bcrypt.hash(value, salt);
  }
}
