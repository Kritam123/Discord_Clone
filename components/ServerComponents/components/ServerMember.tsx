"use client"
import React from 'react'
import { Member, MemberRole, User, Server } from "@prisma/client";
import { BsShieldCheck, BsShieldExclamation } from "react-icons/bs"
import { useParams, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import TooltipContext from '@/components/use-tooltip';
interface ServerMemberProps {
  member: Member & { profile: User };
  server: Server;
}
const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <BsShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  [MemberRole.ADMIN]: <BsShieldExclamation className="h-4 w-4 ml-2 text-rose-500" />
}


const ServerMember = ({
  member,
  server
}: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();
  const onClick = () => {
    router.push(`/servers/${server.id}/conversation/${member.id}`)
  }
  const icon = roleIconMap[member.role];
  return (
    <>
      <TooltipContext className='w-full' content={member.profile.username}>
        <button
          onClick={onClick}
          className={clsx(
            "group px-2 py-2  rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
            params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
          )}
        >
          <Avatar>
            <AvatarImage src={member.profile.image!}
            />
            <AvatarFallback>img</AvatarFallback>
          </Avatar>

          <p
            className={clsx(
              "font-semibold text-sm text-zinc-500 truncate group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
              params?.memberId === member.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
            )}
          >
            {member.profile.username}
          </p>

          {icon}

        </button>
      </TooltipContext>
    </>
  )
}

export default ServerMember