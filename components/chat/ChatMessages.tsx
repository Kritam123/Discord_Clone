"use client";
import { Fragment, useRef, ElementRef } from "react";
import { format } from "date-fns";
import { Member, Message, User } from "@prisma/client";
import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useChatScroll } from "@/hooks/use-chat-sroll";
import { ChatWelcome } from "./chat-welcome";
import { ChatItem } from "./chat-item";
import { LuLoader2, LuServerCrash } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import MessageBox from "../DirectMessages/Components/messagePart/MessageBox";
const DATE_FORMAT = "d MMM yyyy, HH:mm";

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: User;
  };
};
interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
  imageUrl?:string
  displayName?:string
}
const ChatMessages = ({
  name,
  member,
  imageUrl,
  displayName,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });
  useChatSocket({ queryKey, addKey, updateKey });
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  });
// @ts-ignore
  if (status === "loading") {
    return (
      <div className="flex  flex-col flex-1 justify-center items-center">
        <LuLoader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <LuServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }
  return (
    <>
      <div ref={chatRef} className="flex-1 scrollHidden relative    overflow-y-scroll h-[calc(100vh-52px)] flex flex-col py-4">
        {!hasNextPage && <div className="flex-1" />}
        {!hasNextPage && <ChatWelcome imageUrl={imageUrl} displayName={displayName} type={type} name={name} />}
        <Separator/>
        {hasNextPage && (
          <div className="flex justify-center">
            {isFetchingNextPage ? (
              <LuLoader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
            ) : (
              <button
                onClick={() => fetchNextPage()}
                className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
              >
                Load previous messages
              </button>
            )}
          </div>
        )}
        <div className="flex flex-col-reverse mt-auto">
          {data?.pages?.map((group, i) => (
            <Fragment key={i}>
              {group?.items?.map((message: MessageWithMemberWithProfile) => (
                // <MessageBox/>
                <ChatItem
                  key={message.id}
                  id={message.id}
                  currentMember={member}
                  member={message.member}
                  content={message?.content}
                  fileUrl={message.fileUrl}
                  deleted={message.deleted}
                  timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                  isUpdated={message.updatedAt !== message.createdAt}
                  socketUrl={socketUrl}
                  socketQuery={socketQuery}
                />
              ))}
            </Fragment>
          ))}
        </div>
        <div ref={bottomRef} className={cn(type === "conversation" && "mt-10")} />
      </div>
    </>
  );
};

export default ChatMessages;
