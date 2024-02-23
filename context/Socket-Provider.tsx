"use client";
import { db } from "@/lib/db";
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
  setUserId: (userId: string) => void;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  setUserId(userId) {
  },
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {

      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    socketInstance.on("connect", async () => {
      setIsConnected(true);


    });

    socketInstance.on("disconnect", async () => {

      setIsConnected(false);

    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected, setUserId }}>
      {children}
    </SocketContext.Provider>
  )
}