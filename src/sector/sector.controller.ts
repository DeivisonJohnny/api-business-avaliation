import { Body, Controller, Get, Post } from '@nestjs/common';
import ISector from './interface/ISector';
import SectorService from './sector.service';

@Controller('sector')
export class SectorController {
  constructor(readonly sectorService: SectorService) {}

  @Get()
  async getAll() {
    return this.sectorService.getListAll();
  }

  @Post()
  async create(@Body() data: ISector) {
    return this.sectorService.createSector(data);
  }
}
