'use client';
import React from "react";
import Header from "./components/Header";
import { Channel, ChannelType, Member, MemberRole, Server, User } from "@prisma/client";
import { BsShieldCheck, BsFillMicFill } from "react-icons/bs";
import { LuShieldAlert } from "react-icons/lu";
import { BiHash, BiSolidVideo } from "react-icons/bi";
import ServerSearch from "./components/ServerSearch";
import { redirect } from "next/navigation";
import {useDrawer} from "@/hooks/use-drawer-store"
import { Separator } from "../ui/separator";
import UserFooter from "../User/components/UserFooter";
import ServerChannels from "./components/ServerChannels";
import { cn } from "@/lib/utils";
import { IoIosClose } from "react-icons/io";

interface ServerSidebarProps {
  server: Server &{
    members: Member[] &{
        profile:User
    }[]
    channels:Channel[]
  };
  profile: User
}
const ServerSideBar =  ({  profile,server }: ServerSidebarProps) => {
 const {type,isOpen,onClose} =   useDrawer();
 const openServerDrawer = isOpen && type ==="openServerDrawer";
  const iconMap = {
    [ChannelType.TEXT]: <BiHash className="mr-2 h-4 w-4" />,
    [ChannelType.AUDIO]: <BsFillMicFill className="mr-2 h-4 w-4" />,
    [ChannelType.VIDEO]: <BiSolidVideo className="mr-2 h-4 w-4" />,
  };

  const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: (
      <BsShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
    ),
    [MemberRole.ADMIN]: (
      <LuShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
    ),
  };
 

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const members = server?.members.filter(
    (member) => member.userId !== profile.id
  );

  if (!server) {
    return redirect("/channels/me");
  }

  const role = server.members.find(
    (member) => member.userId === profile.id
  )?.role;
  return (
    <div className={cn("-translate-x-[100%]  dark:bg-[#2B2D31] bg-white dark:border-gray-700  border-r border-gray-200 fixed inset-y-0 pb-20 lg:pb-0 z-[100]  w-60 lg:translate-x-0 ",openServerDrawer && "translate-x-[4rem]"    )}>
       <button onClick={()=>onClose()} className="w-8 flex justify-center  items-center ml-2 mt-1 h-8  lg:hidden  bg-gray-800 rounded-full px-1 py-1 ">
          <IoIosClose className="text-2xl text-white"/>
        </button>
      <Header server={server} role={role} />
      <div className="overflow-auto h-full flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            server={server}
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }))
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }))
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }))
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member:Member | any) => ({
                  id: member.id,
                  name: member?.profile.username,
                  // @ts-ignore
                  icon: roleIconMap[member.role] ,
                }))
              },
            ]}
          />
        </div>
        <Separator className=" bg-[#f2f2f2]  dark:bg-zinc-700 rounded-md my-2" />
        <ServerChannels
          textChannels={textChannels}
          audioChannels={audioChannels}
          videoChannels={videoChannels}
          server={server as any}
          role={role}
          apiUrl="/api/channels"
          members= {members}
          profileId={profile.id}
        />
      </div>
      <UserFooter user={profile}/>
    </div>
  );
};
export default ServerSideBar;
