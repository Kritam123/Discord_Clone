"use client"
import React, { MouseEvent } from 'react'
import {
  Channel,
  ChannelType,
  MemberRole,
  Server
} from "@prisma/client";
import { ModalType, useModal } from '@/hooks/use-model-store';
import { useParams, useRouter } from 'next/navigation';
import { BiHash, BiSolidMicrophone, BiSolidVideo } from "react-icons/bi"
import { FaEdit } from "react-icons/fa"
import { BsTrash } from "react-icons/bs"
import { cn } from '@/lib/utils';
import TooltipContext from '@/components/use-tooltip';
interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
  socketUrl?:string,
  socketQuery?:{serverId:string,channelId:string}
}
const iconMap = {
  [ChannelType.TEXT]: BiHash,
  [ChannelType.AUDIO]: BiSolidMicrophone,
  [ChannelType.VIDEO]: BiSolidVideo,
}
const ServerChannel = ({
  channel,
  server,
  role,
socketQuery,
socketUrl
}: ServerChannelProps) => {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();
  const Icon = iconMap[channel.type];
  const onClick = () => {
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`)
  }
  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <Icon className={cn("flex-shrink-0 w-5 h-5 dark:group-hover:text-zinc-600 text-zinc-500 dark:text-zinc-400",
      params?.channelId === channel.id && "dark:text-zinc-200 dark:group-hover:text-white"
      )} />
      <p className={cn(
        "line-clamp-1 truncate font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
        params?.channelId === channel.id && "text-zinc-500 dark:text-zinc-200 dark:group-hover:text-white"
      )}>
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <TooltipContext content='Edit'>
            <FaEdit
              onClick={() => onOpen("editChannel", { server, channel,socketQuery,socketUrl })}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </TooltipContext>


          <TooltipContext content='Delete'>
            <BsTrash
              onClick={() => onOpen("deleteChannel", { channel, server,socketQuery,socketUrl })}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </TooltipContext>
        </div>
      )}
    </button>
  )
}

export default ServerChannel