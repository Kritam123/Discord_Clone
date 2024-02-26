import { NextApiRequest } from "next";
import { Channel, MemberRole } from "@prisma/client";

import { NextApiResponseServerIo } from "@/types";
import { db } from "@/lib/db";
import { currentProfilePages } from "@/lib/getCurrentUser_Page";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "DELETE" && req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const profile = await currentProfilePages(req);
    const { serverId, channelId } = req.query;
    const { name, type } = req.body;
    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!serverId) {
      return res.status(400).json({ error: "Server ID missing" });
    }

    if (!channelId) {
      return res.status(400).json({ error: "Channel ID missing" });
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            userId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!server) {
      return res.status(404).json({ error: "Server not found" });
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    const member = server.members.find(
      (member) => member.userId === profile.id
    );

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    if (req.method === "DELETE") {
      const server = await db.server.update({
        where: {
          id: serverId as any,
          members: {
            some: {
              userId: profile.id,
              role: {
                in: [MemberRole.ADMIN, MemberRole.MODERATOR],
              },
            },
          },
        },
        data: {
          channels: {
            delete: {
              id: channelId as any,
              name: {
                not: "general",
              },
            },
          },
        },
        include: {
          channels: true,
          members:{
            include:{
              profile:true
            }
          }
        },
      });
      const channelupdateKey = `server:${server.id}:channel`;
      res?.socket?.server?.io?.emit(channelupdateKey, server);
      return res.status(200).json(server);

    }
    if (req.method === "PATCH") {
      const server = await db.server.update({
        where: {
          id: serverId as any,
          members: {
            some: {
              userId: profile.id,
              role: {
                in: [MemberRole.ADMIN, MemberRole.MODERATOR],
              },
            },
          },
        },
        data: {
          channels: {
            update: {
              where: {
                id: channelId as any,
                NOT: {
                  name: "general",
                },
              },
              data: {
                name,
                type,
              } as Channel,
            },
          },
        },
        include: {
          channels: true,
          members:{
            include:{
              profile:true
            }
          }
        },
      });
      const channelupdateKey = `server:${server.id}:channel`;
      res?.socket?.server?.io?.emit(channelupdateKey, server);
      return res.status(200).json(server);
    }
  } catch (error) {
    console.log("[MESSAGE_ID]", error);
    return res.status(500).json({ error: "Internal Error" });
  }
}
