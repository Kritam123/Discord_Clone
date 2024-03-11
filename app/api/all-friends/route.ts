import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/getCurrentUser";
export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const friends = await db.friends.findMany({
      where: {
        userId: profile.id,
        isBlock:false
      },
      include: {
        friend:true
      },
      orderBy: {
        createdAt: "desc",
       
      },
    });
    return NextResponse.json(friends);
  } catch (error) {
    console.log("all-friends", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
