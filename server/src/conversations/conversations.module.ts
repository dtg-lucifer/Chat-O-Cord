import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Services } from 'src/utils/constants';
import { Conversation } from 'src/utils/typeorm';
import { ConversationController } from './conversations.controller';
import { ConversationService } from './conversations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation]), UsersModule],
  controllers: [ConversationController],
  providers: [
    { provide: Services.CONVERSATIONS, useClass: ConversationService },
  ],
  exports: [{ provide: Services.CONVERSATIONS, useClass: ConversationService }],
})
export class ConversationsModule {}
