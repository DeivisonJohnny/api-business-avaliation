import { Body, Controller, Post } from '@nestjs/common';
import ISector from './interface/ISector';
import SectorService from './sector.service';

@Controller('sector')
export class SectorController {
  constructor(readonly sectorService: SectorService) {}

  @Post()
  async create(@Body() data: ISector) {
    return this.sectorService.createSector(data);
  }
}
