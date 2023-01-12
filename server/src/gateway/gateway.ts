import { Inject } from '@nestjs/common/decorators';
import { OnEvent } from '@nestjs/event-emitter';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Services } from 'src/utils/constants';
import { AuthenticatedSocket } from 'src/utils/types';
import { IGatewaySession } from './gateway.session';
import { Message } from 'src/utils/typeorm';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
})
export class MessageGateway implements OnGatewayConnection {
  constructor(
    @Inject(Services.GATEWAY_SESSION_MANAGER)
    private readonly sessionManager: IGatewaySession,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: AuthenticatedSocket, ...args: any[]) {
    console.log('Incoming connection', client.id);
    this.sessionManager.setSocket(client.user._id, client);
    console.log(this.sessionManager.getSockets().keys());
  }

  @SubscribeMessage('createMessage')
  handleCreateMessage(
    @MessageBody() data: Message,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Create Message', {
      content: data.content,
      author: data.author.email,
    });
    client.broadcast.emit('createMessage', data);
  }

  @OnEvent('message.create')
  handleMessageCreateEvent(payload: Message) {
    console.log('Event message.create', {
      payloadContent: payload.content,
      author: payload.author.email,
    });
    const {
      author,
      conversation: { creator, recipient },
    } = payload;

    const authorSocket = this.sessionManager.getSocket(author._id);

    const recipientSocket =
      author._id === creator._id
        ? this.sessionManager.getSocket(recipient._id)
        : this.sessionManager.getSocket(creator._id);

    if (authorSocket) authorSocket.emit('createMessage', payload);
    if (recipientSocket) recipientSocket.emit('createMessage', payload);
  }
}
