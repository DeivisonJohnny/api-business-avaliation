import { Body, Controller, Post } from '@nestjs/common';
import AvaliationService from './avaliation.service';
import IAvaliation from './interface/IAvaliation';

@Controller('avaliation')
export default class AvaliationController {
  constructor(readonly avaliationService: AvaliationService) {}

  @Post()
  async createAvaliation(@Body() data: IAvaliation) {
    return this.avaliationService.create(data);
  }
}
