import { Controller, Inject, Post, Body, Get, Param, Query } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IMessageService } from './messages';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { CreateMessageDto } from './dto/CreateMessage.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller(Routes.MESSAGES)
export class MessagesController {
  constructor(
    @Inject(Services.MESSAGES) private readonly messageService: IMessageService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async createMessage(
    @AuthUser() user: User,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    const msg = await this.messageService.createMessage({ ...createMessageDto, user });
    this.eventEmitter.emit("message.create", msg)
    return msg
  }

  @Get(':conversationID')
  getMessagesByConvsersationID(
    @AuthUser() user: User,
    @Param('conversationID') conversationID: number,
  ) {
    return this.messageService.getMessagesByConvId(conversationID)
  }
}
