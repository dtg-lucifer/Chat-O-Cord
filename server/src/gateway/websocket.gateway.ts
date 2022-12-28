import { OnModuleInit } from '@nestjs/common';
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

@WebSocketGateway({
  cors: {
    origin: ["http://localhost:3000"],
  },
})
export class MessageGateway implements OnGatewayConnection, OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {}
  
  handleConnection(client: Socket, ...args: any[]) {
    console.log(client.id);
    client.emit("createMessage", { msg: "Hello i am coming from server" })
  }


  @SubscribeMessage('createMessage')
  handleCreateMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Create Message', data);
    client.broadcast.emit("createMessage", data)
  }

  @OnEvent('message.create')
  handleMessageCreateEvent(payload: any) {
    console.log('Event message.create', payload);
    this.server.emit('createMessage', payload);
  }
}
