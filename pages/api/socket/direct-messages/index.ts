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
    const { value, fileUrl } = req.body;
    const { conversationId } = req.query;

    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!conversationId) {
      return res.status(400).json({ error: "Conversation ID missing" });
    }

    // if (!value) {
    //   return res.status(400).json({ error: "Missing Content" });
    // }

    const conversation = await db.directConversation.findFirst({
      where: {
        id: conversationId as string,
        OR: [
          {
            conversationOne: {
              id: profile.id,
            },
          },
          {
            conversationTwo: {
              id: profile.id,
            },
          },
        ],
      },
      include: {
        conversationOne:true,
        conversationTwo:true
      },
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const user =
      conversation.conversationOne.id === profile.id
        ? conversation.conversationOne
        : conversation.conversationTwo;
    if (!user) {
      return res.status(404).json({ message: "Member not found" });
    }
    const message = await db.directMessage.create({
      data: {
        content: value,
        fileUrl,
        conversationId: conversationId as string,
        userId:user.id
      },
      include: {
       user:true
        },
      },
    );

    const channelKey = `chat:${conversationId}:messages`;

    res?.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[DIRECT_MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
