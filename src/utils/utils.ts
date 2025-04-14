import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class UtilService {
  checkHash(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value || '', hash || '');
  }

  async hash(value: string, salt = 8): Promise<string> {
    return bcrypt.hash(value, salt);
  }

  formatCPF(cpf: string) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) {
      throw new Error('CPF inválido. O CPF deve conter 11 números.');
    }

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  removeFormatCpf(cpf: string): string {
    return cpf.replace(/[^\d]/g, '');
  }
}
