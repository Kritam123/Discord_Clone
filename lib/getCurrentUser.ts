import { db } from "./db";
import {currentUser} from "@clerk/nextjs"
export const currentProfile = async() => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const profile = await db.user.findUnique({
    where: {
      externalUserId:user.id as string
    },
  });

  return profile;
};
