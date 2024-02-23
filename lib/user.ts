import { NextResponse } from "next/server";
import { db } from "./db";
import { currentProfile } from "./getCurrentUser";

export const UpdateUserApi = async (
  image: string,
  username: string,
  displayName: string
) => {
  try {
    const profile = await currentProfile();
    if (!image) {
      return new Error("Missing Info");
    }
    await db.user.update({
      where: {
        id: profile?.id,
      },
      data: {
        image,
        username,
        displayName,
      },
    });
    return true;
  } catch (error) {
    console.log(error, "UpdateImage Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
};
