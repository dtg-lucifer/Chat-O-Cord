import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatParticipant } from 'src/utils/typeorm';
import {
  CreateParticipantParams,
  FindParticipantsParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';
import { IParticipants } from './Participants';

@Injectable()
export class ParticipantsService implements IParticipants {
  constructor(
    @InjectRepository(ChatParticipant)
    private readonly participantRepository: Repository<ChatParticipant>,
  ) {}

  findParticipant(
    params: FindParticipantsParams,
  ): Promise<ChatParticipant | null> {
    return this.participantRepository.findOne(params);
  }

  createParticipant(params: CreateParticipantParams): Promise<ChatParticipant> {
    const participant = this.participantRepository.create(params);
    return this.participantRepository.save(participant);
  }

  findParticipantsConversations(id: number) {
    return this.participantRepository
      .createQueryBuilder('chat_participant')
      .leftJoinAndSelect('chat_participant.conversations', 'conversations')
      .where('chat_participant.id = :id', { id: id })
      .getOne();
  }
}
