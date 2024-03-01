import { db } from "@/lib/db";
import { currentProfile } from "./getCurrentUser";

export const getOrCreateConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  let conversation =
    (await findConversation(memberOneId, memberTwoId)) ||
    (await findConversation(memberTwoId, memberOneId));

  if (!conversation) {
    conversation = await createNewConversation(memberOneId, memberTwoId);
  }

  return conversation;
};

const findConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [{ memberOneId: memberOneId }, { memberTwoId: memberTwoId }],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
};

const createNewConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  try {
    return await db.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
};

export const getOrCreateConversationofCurrentUser = async (conversationOneId:string,conversationTwoId:string) => {
  try {

      if(!conversationOneId || !conversationTwoId) {
        throw new Error("Invalid");
      }
      const profile = await currentProfile();
    if (!profile) {
      throw new Error("Unauthorised!")
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
    return conversation;
  } catch (error) {
    console.log("all-friends", error);
  }
};
 

export const getCurrentConversation = async(conversationId:string)=>{
  try {
    const conversation = await db.directConversation.findUnique({
      where:{
        id:conversationId
      },
      include:{
        conversationOne:true,
        conversationTwo:true
      }
    });
    return conversation;
  } catch (error) {
    console.log("current-Conversation", error);
  }
}