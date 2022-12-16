import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IParticipants } from 'src/participants/Participants';
import { IUserService } from 'src/users/users';
import { Services } from 'src/utils/constants';
import { ChatParticipant, Conversation, User } from 'src/utils/typeorm';
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
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}

  async createConversation(
    user: User,
    createConversationPayload: CreateConversationParams,
  ) {
    const userDB = await this.userService.findUser({ _id: user._id });
    const { authorID, recipientID } = createConversationPayload;
    const participants: ChatParticipant[] = []

    if (!userDB.participant) {
      const participant = await this.createParticipantAndSaveUser(userDB, authorID);
      participants.push(participant)
    } else participants.push(userDB.participant)

    const recipient = await this.userService.findUser({
      _id: recipientID,
    });

    if (!recipient)
      throw new HttpException('Cannot create conversation.', HttpStatus.BAD_REQUEST);

    if (!recipient.participant) {
      const participant = await this.createParticipantAndSaveUser(recipient, recipientID);
      participants.push(participant)
    } else participants.push(recipient.participant)

    const conversation = this.conversationsRepository.create({ participants })
    return await this.conversationsRepository.save(conversation)
  }

  private async createParticipantAndSaveUser(user: User, id: number) {
    const participant = await this.participantsService.createParticipant({
      id,
    });
    user.participant = participant;
    await this.userService.saveUser(user);
    return participant
  }
}
