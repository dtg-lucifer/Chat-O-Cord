import { Socket } from "socket.io";

export const gateWayMiddleware = async (socket: Socket, next: () => void) => {
  // console.log("Socket Middleware", {
  //   sessionCookie: socket.handshake.headers.cookie?.toString().split(";")[0].split("=")[1],
  // });
  next();
};
