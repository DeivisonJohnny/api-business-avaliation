import { Module } from '@nestjs/common';
import AvaliationController from './avaliation.controller';
import AvaliationRepository from './avaliation.repository';
import AvaliationService from './avaliation.service';

@Module({
  controllers: [AvaliationController],
  providers: [AvaliationService, AvaliationRepository],
})
export class AvaliationModule {}
