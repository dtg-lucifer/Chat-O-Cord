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

const { CORS_ORIGIN } = process.env;

@WebSocketGateway({
  cors: {
    origin: [CORS_ORIGIN, 'https://hoppscotch.io/realtime/socketio'],
  },
})
export class MessageGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log(client);
  }

  @SubscribeMessage('createMessage')
  handleCreateMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Create Message', data);
    console.log(client);
  }

    @OnEvent("message.create")
    handleMessageCreateEvent(payload: any) {
      console.log("Event message.create", payload);
      this.server.emit("onMessage", payload)
    }
}
