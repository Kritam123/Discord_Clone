import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/getCurrentUser";
export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const onlineFriends = await db.friends.findMany({
      where: {
        userId: profile.id,
        isBlock:false,
        friend:{
            status:"Online"
        }
      },
      include: {
        friend:true
      },
      orderBy: {
        createdAt: "desc",
       
      },
    });
    return NextResponse.json(onlineFriends);
  } catch (error) {
    console.log("all-friends", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
