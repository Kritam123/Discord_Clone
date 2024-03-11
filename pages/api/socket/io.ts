import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { NextApiResponseServerIo } from "@/types";
import { currentProfilePages } from "@/lib/getCurrentUser_Page";
import { db } from "@/lib/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = async (req: NextApiRequest, res: NextApiResponseServerIo) => {
  const profile = await currentProfilePages(req);
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      // @ts-ignore
      addTrailingSlash: false,
    });
    res.socket.server.io = io;
  }
  res.socket.server.io.on("connection", async (socket) => {
     await db.user.update({
      where: {
        id: profile?.id,
      },
      data: {
        status: "Online",
        socket_id: socket.id,
      },
    });
    socket.on("disconnect",async()=>{
      await db.user.update({
        where: {
          id: profile?.id,
        },
        data: {
          status: "Offline",
          socket_id: null,
        },
      });
    })
  });
  res.end();
};

export default ioHandler;
