import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "./db";
import { currentProfile } from "./getCurrentUser";
export const getUserByUserName = async (username: string) => {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return redirectToSignIn();
    }
    if (!username) {
      throw new Error("Empty Fields!");
    }
    const getSearchUser = await db.user.findUnique({
      where: {
        NOT: {
          id: profile.id,
          displayName: profile.displayName,
        },
        displayName: username,
      },
      include: {
        sender: true,
        friends:true,
        reciver: true,
      },
    });
    return getSearchUser;
  } catch (error) {
    console.log("getUserName", error);
  }
};
