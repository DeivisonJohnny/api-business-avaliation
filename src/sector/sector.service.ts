import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import ISector from './interface/ISector';
import { SectorRepository } from './sector.repository';

@Injectable()
export default class SectorService {
  constructor(readonly sectorRepository: SectorRepository) {}

  async createSector(sector: ISector) {
    const sectorId = await this.sectorRepository.getWithId(
      sector.name.toLowerCase().replace(/\s+/g, ''),
    );

    if (sectorId) {
      throw new HttpException(
        'Sector already registered',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    return this.sectorRepository.create(sector);
  }
}
