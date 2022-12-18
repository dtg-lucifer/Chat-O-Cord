import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessagesController } from './messages.controller';
import { Services } from 'src/utils/constants';

@Module({
  providers: [{
    provide: Services.MESSAGES,
    useClass: MessageService
  }],
  controllers: [MessagesController]
})
export class MessagesModule {}
