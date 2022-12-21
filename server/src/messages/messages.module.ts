import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessagesController } from './messages.controller';
import { Services } from 'src/utils/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation, Message } from 'src/utils/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Conversation])],
  providers: [
    {
      provide: Services.MESSAGES,
      useClass: MessageService,
    },
  ],
  controllers: [MessagesController],
})
export class MessagesModule {}
