import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatParticipant } from 'src/utils/typeorm';
import { FindParticipantsParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IParticipants } from './Participants';

@Injectable()
export class ParticipantsService implements IParticipants {
  constructor(
    @InjectRepository(ChatParticipant)
    private readonly participantRepository: Repository<ChatParticipant>,
  ) {}

  findParticipant(params: FindParticipantsParams): Promise<ChatParticipant | null> {
      return this.participantRepository.findOne(params)
  }

  createParticipant(): Promise<ChatParticipant> {
      return
  }
}
