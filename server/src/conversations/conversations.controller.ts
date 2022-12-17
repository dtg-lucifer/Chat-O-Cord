import { Controller } from '@nestjs/common';
import { Body, Get, Inject, Param, Post, UseGuards } from '@nestjs/common/decorators';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { Routes, Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { IConversationsService } from './conversations';
import { CreateConversationDto } from './dto/CreateConversation.dto';

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticatedGuard)
export class ConversationController {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationService: IConversationsService,
  ) {}

  @Post()
  async createConversation(
    @AuthUser() user: User,
    @Body() createConversationPayload: CreateConversationDto,
  ) {
    return this.conversationService.createConversation(user, createConversationPayload)
  }

  @Get()
  async getConversations(@AuthUser() user: User) {
    const participant = await this.conversationService.find(user.participant.id)
    return participant.conversations.map((c) => ({
      ...c,
      recipient: c.participants.find((p) => p.user._id !== user._id)
    }))
  }

  @Get(":id")
  async getConversationByID(@Param("id") id: number) {
    return await this.conversationService.findConversationByID(id)
  }
}
