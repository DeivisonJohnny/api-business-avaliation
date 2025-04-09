import { Injectable } from '@nestjs/common';
import AvaliationRepository from './avaliation.repository';
import IAvaliation from './interface/IAvaliation';

@Injectable()
export default class AvaliationService {
  constructor(readonly avaliationRepository: AvaliationRepository) {}

  async create(avaliation: IAvaliation) {
    return this.avaliationRepository.createAvaliation(avaliation);
  }
}
