import { Injectable } from '@nestjs/common';
import { IMessageService } from './messages';
import { Message } from 'src/utils/typeorm';

@Injectable()
export class MessageService implements IMessageService {
    createMessage(): Promise<Message> {
        return
    }
}
