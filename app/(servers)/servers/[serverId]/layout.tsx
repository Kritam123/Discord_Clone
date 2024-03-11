import ServerSideBar from "@/components/ServerComponents/ServerSideBar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children, params }: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/login");
  }

 
  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
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
  if (!server) {
    return redirect("/channels/me");
  }
  return (
    <Sidebar>
      <div className=" flex h-full">
        <ServerSideBar server={server}  profile={profile}  />
        <div className="ml-16 lg:ml-60 w-full h-screen">
          {children}
        </div>
      </div>
    </Sidebar>
  );
};

export default layout;
