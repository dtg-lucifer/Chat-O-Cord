import { IoAdapter } from '@nestjs/platform-socket.io';
import { plainToInstance } from 'class-transformer';
import * as cookie from 'cookie';
import * as cookieParser from 'cookie-parser';
import { Session, User } from 'src/utils/typeorm';
import { AuthenticatedSocket } from 'src/utils/types';
import { Repository, getRepository } from 'typeorm';

export class WebsocketAdapter extends IoAdapter {
  createIOServer(port: number, options?: any) {
    const sessionRepositiory: Repository<Session> = getRepository(Session);
    const server = super.createIOServer(port, options);

    server.use(async (socket: AuthenticatedSocket, next) => {
      const { cookie: clientCookie } = socket.handshake.headers;
      if (clientCookie === undefined || !clientCookie) {
        console.log('No cookie found!');
        return next(new Error('No cookies found..!'));
      }

      const { CHATAPP_SESSION_ID } = cookie.parse(clientCookie);

      if (CHATAPP_SESSION_ID === undefined || !CHATAPP_SESSION_ID) {
        console.log('CHATAPP_SESSION_ID does not exists..!');
        return next(new Error('Not authenticated'));
      }

      const signedCookie = cookieParser.signedCookie(
        CHATAPP_SESSION_ID,
        process.env.COOKIE_SECRET,
      );

      if (!signedCookie) return next(new Error('No signed cookie found'));
      const sessionDB = await sessionRepositiory.findOne({ id: signedCookie });
      const userDB = plainToInstance(
        User,
        JSON.parse(sessionDB.json).passport.user,
      );
      socket.user = userDB;
      next();
    });
    return server;
  }
}
