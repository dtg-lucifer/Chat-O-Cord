import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserService } from 'src/users/users';
import { Services } from 'src/utils/constants';
import { Conversation, User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { IConversationsService } from './conversations';
import { CreateConversationParams } from 'src/utils/types';

@Injectable()
export class ConversationService implements IConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationsRepository: Repository<Conversation>,
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}

  async findByID(id: number): Promise<Conversation> {
    return await this.conversationsRepository.findOne({
      where: { id },
      relations: ['creator', 'recipient', 'lastMessageSent'],
    });
  }

  async getConversations(id: number): Promise<Conversation[]> {
    return await this.conversationsRepository
      .createQueryBuilder('conversations')
      .leftJoin('conversations.creator', 'creator')
      .addSelect([
        'creator._id',
        'creator.firstName',
        'creator.lastName',
        'creator.userName',
        'creator.email',
      ])
      .leftJoin('conversations.recipient', 'recipient')
      .addSelect([
        'recipient._id',
        'recipient.firstName',
        'recipient.lastName',
        'recipient.userName',
        'recipient.email',
      ])
      .leftJoinAndSelect('conversations.lastMessageSent', 'lastMessageSent')
      .where('creator._id = :id', { id })
      .orWhere('recipient._id = :id', { id })
      .orderBy('conversations.updatedAt', 'DESC')
      .getMany();
  }

  async createConversation(
    user: User,
    payload: CreateConversationParams,
  ): Promise<Conversation> {
    const { email } = payload;
    const recipient = await this.userService.findUser({ email });

    if (!recipient)
      throw new HttpException('Recipient not found', HttpStatus.BAD_REQUEST);

    if (user._id === recipient._id)
      throw new HttpException(
        'Cannot create conversation.',
        HttpStatus.BAD_REQUEST,
      );

    const existingConversation = await this.conversationsRepository.findOne({
      where: [
        {
          creator: { id: user._id },
          recipient: { id: recipient._id },
        },
        {
          creator: { id: recipient._id },
          recipient: { id: user._id },
        },
      ],
    });
    if (existingConversation)
      throw new HttpException(
        'Conversation already exists',
        HttpStatus.CONFLICT,
      );

    const conversation = this.conversationsRepository.create({
      creator: user,
      recipient: recipient,
    });
    return await this.conversationsRepository.save(conversation);
  }
}
