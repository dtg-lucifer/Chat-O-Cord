import { Controller, Inject, Post, Body } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IMessageService } from './messages';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { CreateMessageDto } from './dto/CreateMessage.dto';

@Controller(Routes.MESSAGES)
export class MessagesController {
  constructor(
    @Inject(Services.MESSAGES) private readonly messageService: IMessageService,
  ) {}

  @Post()
  createMessage(
    @AuthUser() user: User,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.messageService.createMessage({ ...createMessageDto, user });
  }
}
