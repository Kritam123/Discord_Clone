import { db } from "@/lib/db";

export const isFriendRequest = async (senderId: string, reciverId: string) => {
  let FriendRequest =
    (await findFriendRequest(senderId, reciverId)) ||
    (await findFriendRequest(reciverId, senderId));

  if (!FriendRequest) {
    return false;
  }

  return true;
};

const findFriendRequest = async (senderId: string, reciverId: string) => {
  try {
    return await db.friendRequest.findFirst({
      where: {
        AND: [{ senderId: senderId }, { reciverId: reciverId }],
      },
    });
  } catch {
    return null;
  }
};
