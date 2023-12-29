import { createContext } from "react";
import { Socket, io } from "socket.io-client";

export interface SocketContextType {
  socket: Socket;
}

export const socket = io(process.env.REACT_APP_PUBLIC_SOCKET_URL as string, {
  withCredentials: true,
  auth: (cb) => {
    cb({
      token: process.env.REACT_APP_SESSION_SECRET as string,
    });
  }
});

export const SocketContext = createContext<SocketContextType>({ socket });
