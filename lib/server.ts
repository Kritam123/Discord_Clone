import { NextResponse } from "next/server";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "./getCurrentUser";
import { db } from "./db";
import { Member, MemberRole } from "@prisma/client";
export const ServerCreate = async (name: string, image: string) => {
  const profile = await currentProfile();

  try {
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const server = await db.server.create({
      data: {
        creatorId: profile.id,
        name,
        imgUrl: image,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [{ userId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });
    const { id } = server;
    return id;
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
export const updateServerApi = async (
  serverId: string,
  name: string,
  image: string
) => {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        creatorId: profile.id,
      },
      data: {
        name: name,
        imgUrl: image,
      },
    });

    const { id } = server;
    return id;
  } catch (error) {
    console.log("[SERVER_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
export const newInviteCodeApi = async (serverId: string) => {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        creatorId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });
    return server;
  } catch (error) {
    console.log("[SERVER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

// member kick

export const kickMemberApi = async (serverId: string, memberId: string) => {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    if (!memberId) {
      return new NextResponse("Member ID missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        creatorId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: memberId,
            userId: {
              not: profile.id,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return server;
  } catch (error) {
    console.log("[MEMBER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

// change role
export const roleChangeMemberApi = async (
  serverId: string,
  memberId: string,
  role: string
) => {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    if (!memberId) {
      return new NextResponse("Member ID missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        creatorId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: memberId,
              userId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          } as any,
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[MEMBERS_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

// delete server Api

export const deleteServerApi = async (serverId: string) => {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.delete({
      where: {
        id: serverId,
        creatorId: profile.id,
      },
    });

    return server;
  } catch (error) {
    console.log("[SERVER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};



export const leaveServerApi = async (serverId: string) => {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        creatorId: {
          not: profile.id
        },
        members: {
          some: {
            userId: profile.id
          }
        }
      },
      data: {
        members: {
          deleteMany: {
            userId: profile.id
          }
        }
      }
    });

    return true;
  } catch (error) {
    console.log("[SERVER_ID_LEAVE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
