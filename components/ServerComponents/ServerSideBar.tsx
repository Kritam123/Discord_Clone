import React from "react";
import Header from "./components/Header";
import { ChannelType, MemberRole } from "@prisma/client";
import { BsShieldCheck, BsFillMicFill } from "react-icons/bs";
import { LuShieldAlert } from "react-icons/lu";
import { BiHash, BiSolidVideo } from "react-icons/bi";
import ServerSearch from "./components/ServerSearch";
import ServerSection from "./components/Server-Section";
import ServerChannel from "./components/ServerChannel";
import ServerMember from "./components/ServerMember";
import { currentProfile } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Separator } from "../ui/separator";
import UserFooter from "../User/components/UserFooter";
interface ServerSidebarProps {
  serverId: string;
}
const ServerSideBar= async ({ serverId }:ServerSidebarProps) => {
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

  const profile = await currentProfile();

  if (!profile) {
    return redirect("/sign-in");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
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
    <div className=" dark:bg-[#2B2D31]  bg-white  fixed inset-y-0 pb-20 lg:pb-0  lg:w-60 lg:block  border-gray-200 block">
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
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.username,
                  icon: roleIconMap[member.role],
                }))
              },
            ]}
          />
        </div>
        <Separator className=" bg-[#f2f2f2]  dark:bg-zinc-700 rounded-md my-2" />
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
              server={server}
            />
            <div className="space-y-[2px]">
              {textChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
          {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
              server={server}
            />
            <div className="space-y-[2px]">
              {audioChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
              server={server}
            />
            <div className="space-y-[2px]">
              {videoChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
         {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              role={role}
              label="Members"
              server={server}
            />
            <div className="space-y-[2px]">
              {members.map((member) => (
                <ServerMember
                  key={member.id}
                  member={member}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <UserFooter  user={profile}/>
    </div>
  );
};
export default ServerSideBar;
