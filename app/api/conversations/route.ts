import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/getCurrentUser";
export async function POST(req: Request) {
  try {
    // @ts-ignore
      const { conversationOneId, conversationTwoId } = req.json();

      if(!conversationOneId || conversationTwoId) {
        return new NextResponse("Invalid",{status:400});
      }
      const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const findConversation = async (
      conversationOneId: string,
      conversationTwoId: string
    ) => {
      try {
        return await db.directConversation.findFirst({
          where: {
            AND: [
              { ConversationOneId: conversationOneId },
              { ConversationTwoId: conversationTwoId },
            ],
          },
          include: {
            conversationOne: true,
            conversationTwo: true,
          },
        });
      } catch {
        return null;
      }
    };
    const createNewConversation = async (
      conversationOneId: string,
      conversationTwoId: string
    ) => {
      try {
        return await db.directConversation.create({
          data: {
            ConversationOneId: conversationOneId,
            ConversationTwoId: conversationTwoId,
          },
          include: {
            conversationOne: true,
            conversationTwo: true,
          },
        });
      } catch {
        return null;
      }
    };
    let conversation =
      (await findConversation(conversationOneId, conversationTwoId)) ||
      (await findConversation(conversationTwoId, conversationOneId));
    if (!conversation) {
      conversation = await createNewConversation(
        conversationOneId,
        conversationTwoId
      );
    }
    return NextResponse.json(conversation);
  } catch (error) {
    console.log("all-friends", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
