import { OnModuleInit } from '@nestjs/common';
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
    credentials: true
  },
})
export class MessageGateway implements OnGatewayConnection, OnModuleInit {

  constructor(
    @Inject(Services.GATEWAY_SESSION_MANAGER) private readonly sessionManager: IGatewaySession
  ) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {}

  handleConnection(client: AuthenticatedSocket, ...args: any[]) {
    console.log('Incoming connection', client.id);
    this.sessionManager.setSocket(client.user._id, client)
    client.emit('createMessage', { msg: 'Hello i am coming from server' });
  }

  @SubscribeMessage('createMessage')
  handleCreateMessage(
    @MessageBody() data: Message,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Create Message', data);
    client.broadcast.emit('createMessage', data);
  }

  @OnEvent('message.create')
  handleMessageCreateEvent(payload: Message) {
    console.log('Event message.create', payload.content);
    this.server.emit('createMessage', payload);
  }
}
