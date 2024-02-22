import { createContext, useMemo } from "react";
import { Socket, io } from "socket.io-client";

export interface SocketContextType {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextType>({ socket: null });

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useMemo(() => {
    return io(process.env.REACT_APP_PUBLIC_SOCKET_URL as string, {
      withCredentials: true,
      auth: (cb) => {
        cb({
          token: process.env.REACT_APP_SESSION_SECRET as string,
        });
      },
    });
  }, []);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
