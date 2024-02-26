"use client";

import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import qs from "query-string";
import { Member, MemberRole, User } from "@prisma/client";
import { BsShieldCheck, BsShieldExclamation } from "react-icons/bs";
import { BiTrashAlt } from "react-icons/bi";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { useModal } from "@/hooks/use-model-store";
// import { Avatar, Tooltip } from "@mui/material";
import clsx from "clsx";
import { AiOutlineFile } from "react-icons/ai";
import { FaEdit, FaHashtag } from "react-icons/fa";
import TooltipContext from "../use-tooltip";
import { MdAddReaction } from "react-icons/md";
import { IoIosMore, IoLogoIonitron } from "react-icons/io";

interface ChatItemProps {
  id: string;
  content: string | null;
  member: Member & {
    profile: User;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const roleIconMap = {
  GUEST: null,
  MODERATOR: <BsShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <BsShieldExclamation className="h-4 w-4 ml-2 text-rose-500" />,
};



export const ChatItem = ({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<string | null>("");
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const onMemberClick = () => {
    if (member.id === currentMember.id) {
      return;
    }

    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keyDown", handleKeyDown);
  }, []);

  const onSubmit = async (e: FormEvent, value: string) => {
    e.preventDefault();
    if(!value) return;
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });
      await axios.patch(url, {value});
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setValue(content);
  }, [content]);
  const fileType = fileUrl?.split(".").pop();
  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const isPDF = fileType === "pdf" && fileUrl;
  const isImage = !isPDF && fileUrl;

  return (
    <div className="relative group flex items-center hover:bg-black/5 p-2 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div
          onClick={onMemberClick}
          className="cursor-pointer hover:drop-shadow-md transition"
        >
          <Avatar>
            <AvatarImage src={member.profile.image!} />
            <AvatarFallback>img</AvatarFallback>
          </Avatar>


        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p
                onClick={onMemberClick}
                className=" text-balck dark:text-zinc-100 text-[16px] capitalize hover:underline cursor-pointer"
              >
                {member.profile.username}
              </p>
              <TooltipContext content={member.role}>{roleIconMap[member.role]!}</TooltipContext>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timestamp}
            </span>
          </div>
          {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
            >
              <Image
                src={fileUrl}
                alt={content as any}
                fill
                className="object-cover"
              />
            </a>
          )}
          {isPDF && (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
              <AiOutlineFile className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                PDF File
              </a>
            </div>
          )}
          {!fileUrl && !isEditing && (
            <p
              className={clsx(
                "text-sm text-black dark:text-zinc-300 text-[16px]",
                deleted &&
                "italic text-zinc-500 dark:text-zinc-400 text-[15px] mt-1"
              )}
            >
              {content}
              {isUpdated && !deleted && (
                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </p>
          )}
          {!fileUrl && isEditing && (
            <>
              <form
                className="flex items-center w-full gap-x-2 pt-2"
                onSubmit={(e) => onSubmit(e, value as string)}
              >
                <div className="relative w-full">
                  <input
                    className="py-1 px-1 bg-zinc-700/75 dark:placeholder:text-zinc-700 placeholder:text-white text-white outline-none border-none border-0  dark:text-zinc-200"
                    placeholder="Edited message"
                    value={value as string}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
                <button type="submit" className="text-sm bg-white shadow-lg px-3 text-black dark:text-zinc-100">Save</button>
              </form>
              <span className="text-[10px] mt-1 text-zinc-400">
                Press escape to cancel, enter to save
              </span>
            </>
          )}
        </div>
      </div>

      {canDeleteMessage && (
        
        <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 shadow-md bg-[#f2f2f2] dark:bg-zinc-800  rounded-sm">
          {canEditMessage && (
            <TooltipContext content="Edit">
              <FaEdit
                onClick={() => setIsEditing(true)}
                className="cursor-pointer ml-auto w-4 h-4 dark:text-white dark:hover:text-zinc-300 hover:text-zinc-700 text-zinc-800 transition"
              />
            </TooltipContext>
          )}
          <TooltipContext content="Delete">
            <BiTrashAlt
              onClick={() =>
                onOpen("deleteMessage", {
                  apiUrl: `${socketUrl}/${id}`,
                  query: socketQuery,
                })
              }
              className="cursor-pointer ml-auto w-4 h-4  dark:text-white dark:hover:text-zinc-300 hover:text-zinc-700 text-zinc-800 transition"
            />
          </TooltipContext>
        </div>
      )}
      {/* <div className="gap-2 group-hover:flex absolute right-2 top-0 rounded-md px-2 py-2 hidden bg-[#1E1F22]">
        <MdAddReaction className="w-5 h-5 cursor-pointer  text-gray-400 hover:text-white" />
        <IoLogoIonitron className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
        <FaHashtag className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
        <IoIosMore className="w-5 h-5 text-gray-400  hover:text-white cursor-pointer" />
      </div> */}
    </div>
  );
};
