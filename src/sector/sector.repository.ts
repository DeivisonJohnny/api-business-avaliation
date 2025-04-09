import { Prisma } from 'src/prisma/prisma.service';
import ISector from './interface/ISector';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SectorRepository {
  constructor(readonly prisma: Prisma) {}

  async getWithId(id: string) {
    return this.prisma.sector.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async create(sector: ISector) {
    return this.prisma.sector.create({
      data: {
        id: sector.name.toLowerCase().replace(/\s+/g, ''),
        name: sector.name,
      },
    });
  }
}
