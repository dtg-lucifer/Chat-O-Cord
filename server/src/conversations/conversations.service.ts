import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IParticipants } from 'src/participants/Participants';
import { Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { Conversation, User } from 'src/utils/typeorm';
import { CreateConversationParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IConversationsService } from './conversations';

@Injectable()
export class ConversationService implements IConversationsService {

  constructor(
    @InjectRepository(Conversation)
    private readonly conversationsRepository: Repository<Conversation>,
    @Inject(Services.PARTICIPANTS)
    private readonly participantsService: IParticipants,
  ) {}

  async createConversation(createConversationPayload: CreateConversationParams) {
    // const author = await this.participantsService.findParticipant({ id: createConversationPayload.authorID })
    const recipient = await this.participantsService.findParticipant({ id: createConversationPayload.recipientID })
  }
}
