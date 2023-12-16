import { Socket } from "socket.io";

export const gateWayMiddleware = async (socket: Socket, next: () => void) => {
  console.log("Socket Middleware", {
    data: socket.handshake.headers.cookie?.toString(),
  });
  next();
};
