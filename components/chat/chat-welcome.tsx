import { BiHash } from "react-icons/bi";
import HeaderPart from "../DirectMessages/Components/messagePart/HeaderPart";

interface ChatWelcomeProps {
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string
  displayName?:string
};

export const ChatWelcome = ({
  name,
  type,
  displayName,
  imageUrl
}: ChatWelcomeProps) => {
  return (
    <div className="space-y-2 px-4 mb-4">
      {type === "channel" && (
        <>
          <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
            <BiHash className="h-12 w-12 text-white" />
          </div>
          <p className="text-xl text-[#313338] dark:text-white md:text-3xl font-bold">
            Welcome to #{name}
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            This is the start of the #{name} channel.
          </p>
        </>

      )}

      {
        type === "conversation" &&
        (
          <>
           <HeaderPart 
           imageUrl={imageUrl}
           displayName={name}
           name={displayName}
           />
          </>
        )
      }
    </div>
  )
}