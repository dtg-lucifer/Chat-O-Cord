import { Injectable } from '@nestjs/common';
import { AuthenticatedSocket } from 'src/utils/types';

export interface IGatewaySession {
  getSocket(id: number): AuthenticatedSocket;
  setSocket(id: number, socket: AuthenticatedSocket): void;
  removeSocket(id: number): void;
  getSockets(): Map<number, AuthenticatedSocket>
}

@Injectable()
export class GatewaySessionManager implements IGatewaySession {
  private readonly sessions: Map<number, AuthenticatedSocket> = new Map();

  getSocket(id: number) {
    return this.sessions.get(id);
  }

  setSocket(useerId: number, socket: AuthenticatedSocket) {
    this.sessions.set(useerId, socket);
  }

  removeSocket(id: number) {
    this.sessions.delete(id);
  }

  getSockets(): Map<number, AuthenticatedSocket> {
    return this.sessions;
  }
}
