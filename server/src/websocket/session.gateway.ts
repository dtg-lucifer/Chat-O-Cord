import { Socket } from "socket.io";

interface ISession {
	getSocket(id: string): Socket;
	setSocket(id: string, socket: Socket): void;
	removeSocket(id: string): void;
	getSockets(): Map<string, Socket>;
}

export class GatewaySession implements ISession {
	private sockets: Map<string, Socket>;

	constructor() {
		this.sockets = new Map();
	}

	getSocket(id: string): Socket {
		return this.sockets.get(id) as Socket;
	}

	setSocket(id: string, socket: Socket): void {
		this.sockets.set(id, socket);
	}

	removeSocket(id: string): void {
		this.sockets.delete(id);
	}

	getSockets(): Map<string, Socket> {
		return this.sockets;
	}
}