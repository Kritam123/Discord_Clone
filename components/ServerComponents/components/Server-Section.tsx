"use client"
import React from "react";
import { ChannelType, MemberRole } from "@prisma/client";
import {AiOutlinePlus,AiTwotoneSetting} from "react-icons/ai"
import { useModal } from '@/hooks/use-model-store';
import TooltipContext from "@/components/use-tooltip";
import { ServerWithMembersWithProfiles } from "@/types";
interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}
const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) => {
  const { onOpen } = useModal();
  return  (
  
  <div className="flex items-center w-full justify-between py-2">
  <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
    {label}
  </p>
  {role !== MemberRole.GUEST && sectionType === "channels" && (
    <TooltipContext content="Create Channel" >
      <button
        onClick={() => onOpen("createChannel", { channelType })}
        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
      >
        <AiOutlinePlus className="h-4 w-4" />
      </button>
    </TooltipContext>
  )}
  {role === MemberRole.ADMIN && sectionType === "members" && (
    <TooltipContext content="Manage Members" >
      <button
        onClick={() => onOpen("members", { server })}
        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
      >
        <AiTwotoneSetting className="h-4 w-4" />
      </button>
    </TooltipContext>
  )}
</div>)
};

export default ServerSection;
