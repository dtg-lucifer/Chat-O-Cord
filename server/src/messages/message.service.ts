import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IMessageService } from './messages';
import { Conversation, Message, User } from 'src/utils/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageParams } from 'src/utils/types';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class MessageService implements IMessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async createMessage({
    user,
    content,
    conversationID,
  }: CreateMessageParams): Promise<Message> {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationID },
      relations: ['creator', 'recipient'],
    });
    if (!conversation)
      throw new HttpException(
        'Conversation not found.',
        HttpStatus.BAD_REQUEST,
      );

    if (
      conversation.creator._id === user._id &&
      conversation.recipient._id === user._id
    ) {
      throw new HttpException(
        'Cannot create message in this conversation.',
        HttpStatus.FORBIDDEN,
      );
    }
    conversation.creator = instanceToPlain(conversation.creator) as User;
    conversation.recipient = instanceToPlain(conversation.recipient) as User;
    const newMessage = this.messageRepository.create({
      content,
      conversation,
      author: instanceToPlain(user),
    });

    const savedMessage = await this.messageRepository.save(newMessage);
    conversation.lastMessageSent = savedMessage;
    await this.conversationRepository.save(conversation);
    return savedMessage;
  }

  async getMessagesByConvId(id: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: { conversation: { id } },
      order: { createdAt: "DESC" }
    })
  }
}
