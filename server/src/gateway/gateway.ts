import { Inject } from '@nestjs/common/decorators';
import { OnEvent } from '@nestjs/event-emitter';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayInit,
} from '@nestjs/websockets';
import { ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Services } from 'src/utils/constants';
import { AuthenticatedSocket } from 'src/utils/types';
import { IGatewaySession } from './gateway.session';
import { Message } from 'src/utils/typeorm';
import { ConversationService } from 'src/conversations/conversations.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
})
export class MessageGateway implements OnGatewayConnection, OnGatewayInit {
  constructor(
    @Inject(Services.GATEWAY_SESSION_MANAGER)
    private readonly sessionManager: IGatewaySession,
    @Inject(Services.CONVERSATIONS)
    private readonly conversationService: ConversationService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: AuthenticatedSocket, ...args: any[]) {
    this.sessionManager.setSocket(client.user._id, client);
    console.log('Incoming connection', { socketId: client.id });
    console.log({ connectedUserId: this.sessionManager.getSockets().keys() });
    console.log({ rooms: client.rooms });
  }

  afterInit(server: Server) {
    console.log('Gateway initialized', { sockets: server.sockets.name });
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

  @SubscribeMessage('onTypingStart')
  async handleOnTypingStart(@MessageBody() { conversationId }: { conversationId: number }, @ConnectedSocket() client: AuthenticatedSocket) {
    const conversation = await this.conversationService.findByID(conversationId);
    const recipient = conversation.creator._id === client.user._id ? conversation.recipient : conversation.creator;
    const recipientSocket = this.sessionManager.getSocket(recipient._id);
    console.log("Typing start", { conversationdID: conversation.id });
    recipientSocket && recipientSocket.emit('onTyping', { conversationId });
  }

  @SubscribeMessage('onTypingEnd')
  async handleOnTypingEnd(@MessageBody() { conversationId }: { conversationId: number }, @ConnectedSocket() client: AuthenticatedSocket) { 
    const conversation = await this.conversationService.findByID(conversationId);
    const recipient = conversation.creator._id === client.user._id ? conversation.recipient : conversation.creator;
    const recipientSocket = this.sessionManager.getSocket(recipient._id);
    console.log("Typing end", { conversationdID: conversation.id });
    recipientSocket && recipientSocket.emit('onTypingEnd', { conversationId });
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
