import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/types";
import { currentProfilePages } from "@/lib/getCurrentUser_Page";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const profile = await currentProfilePages(req);
    const { name, type } = req.body;
    const { serverId } = req.query;
    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!serverId) {
      return res.status(400).json({ error: "Server ID missing" });
    }
    if (!name && !type) {
      return res.status(400).json({ error: "Name and Type Missing" });
    }
    if (name === "general") {
      return res.status(400).json("Name cannot be 'general'");
    }
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
          create: {
            profileId: profile.id,
            name,
            type: type as ChannelType,
          },
        },
      },
      include:{
        channels:true,
        members:{
          include:{
            profile:true
          }
        }
      }
    });
    const channelCreateKey = `server:${server.id}:channel`;
    res?.socket?.server?.io?.emit(channelCreateKey, server);
    return res.status(200).json(server);
  } catch (error) {
    console.log("[Channel-Post]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
