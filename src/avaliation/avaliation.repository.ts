import { Prisma } from 'src/prisma/prisma.service';
import IAvaliation from './interface/IAvaliation';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class AvaliationRepository {
  constructor(private readonly prisma: Prisma) {}

  async createAvaliation(avaliation: IAvaliation) {
    return await this.prisma.avaliations.create({
      data: {
        userId: avaliation.userId,
        comment: avaliation.comment,
        score: avaliation.score,
      },
    });
  }
}
