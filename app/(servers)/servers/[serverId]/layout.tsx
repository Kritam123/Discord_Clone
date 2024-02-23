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
      members: {
        some: {
          userId: profile?.id
        }
      }
    }
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <Sidebar>
      <div className=" lg:flex h-full">
        <ServerSideBar serverId={params.serverId} />
        <div className="ml-60 border w-[calc(100%-240px)] h-screen">
          {children}
        </div>
      </div>
    </Sidebar>
  );
};

export default layout;
