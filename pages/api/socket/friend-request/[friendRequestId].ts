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
    const { requestId, senderId, reciverId } = req.query;
    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!requestId) {
      return res.status(400).json({ error: "requestId ID missing" });
    }

    const request = await db.friendRequest.findFirst({
      where: {
        id: requestId as string,
      },
    });

    if (!request) {
      return res.status(404).json({ error: "request not found" });
    }

    if (req.method === "DELETE") {
      const req = await db.friendRequest.delete({
        where: {
          id: requestId as any,
        },
      });
      const channelupdateKey = `req:${req}`;
      res?.socket?.server?.io?.emit(channelupdateKey, req);
      return res.status(200).json(req);
    }
    if (req.method === "PATCH") {
      const data =  await db.friendRequest.update({
        where: {
          id: requestId as any,
        },
        data: {
          sender: {
            update: {
              friends: {
                create: {
                  userId: reciverId as string,
                },
              },
            },
          },
          reciver: {
            update: {
              friends: {
                create: {
                  userId: senderId as string,
                },
              },
            },
          },
        },
      });
      return res.status(200).json(data);
    }
  } catch (error) {
    console.log("[friendRequest_ID]", error);
    return res.status(500).json({ error: "Internal Error" });
  }
}
