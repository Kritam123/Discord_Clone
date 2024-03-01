import { NextApiRequest } from "next";

import { NextApiResponseServerIo } from "@/types";
import { currentProfilePages } from "@/lib/getCurrentUser_Page";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const profile = await currentProfilePages(req);
    const { reciverId, senderId } = req.body;
    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!reciverId) {
      return res.status(400).json({ error: "reciver ID missing" });
    }

    const isFriendRequestExisting = await db.friendRequest.findFirst({
      where: {
        OR: [
          {
            senderId: senderId,
            reciverId: reciverId,
          },
          {
            senderId: reciverId,
            reciverId: senderId,
          },
        ],
      },
    });

    if (isFriendRequestExisting) {
      return null;
    }

    const createFriendRequest = async (senderId: string, reciverId: string) => {
      try {
        const friendRequest = await db.friendRequest.create({
          data: {
            senderId: senderId,
            reciverId: reciverId,
          },
          include:{
            sender:true,
            reciver:true
          }
        });
        return friendRequest;
      } catch (error) {
        console.log("friendRequest", error);
      }
    };

    const data = await createFriendRequest(senderId, reciverId);
    const createFriendKey = `request:${profile?.id}`;
    res?.socket?.server?.io?.emit(createFriendKey, data);
    return res.status(200).json(data);
  } catch (error) {
    console.log("[Friend_ReQuest]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
