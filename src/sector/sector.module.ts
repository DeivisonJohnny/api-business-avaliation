import { Module } from '@nestjs/common';
import { SectorController } from './sector.controller';
import { SectorRepository } from './sector.repository';
import SectorService from './sector.service';

@Module({
  controllers: [SectorController],
  providers: [SectorService, SectorRepository],
})
export default class SectorModule {}
