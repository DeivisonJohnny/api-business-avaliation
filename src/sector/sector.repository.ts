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

  async getAll() {
    const listSector = await this.prisma.sector.findMany({
      include: {
        _count: {
          select: { employees: true },
        },
      },
    });
    const countSector = await this.prisma.sector.count();
    return { listSector, count: countSector };
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
