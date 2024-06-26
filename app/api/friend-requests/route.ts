import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/getCurrentUser";
export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const requests = await db.friendRequest.findMany({
      where: {
        reciverId: profile.id,
      },
      include: {
        sender: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(requests);
  } catch (error) {
    console.log("Friends-Requests", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
