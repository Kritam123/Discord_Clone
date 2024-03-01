import React from 'react'
import {BiHash} from "react-icons/bi"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChatVideoButton } from './chat-video';
import { SocketIndicator } from '../socket-indicator';
interface ChatHeaderProps {
    serverId?: string;
    name: string ;
    type: "channel" | "conversation";
    imageUrl?: string;
    userId?:string
  }
const Chatheader = ({name,type,imageUrl}:ChatHeaderProps) => {
  return (
    <div className="text-md w-full font-semibold px-3 py-3  flex items-center h-12  bg-white dark:bg-[#313338] dark:border-neutral-800 border-b-2">
    {/* <MobileToggle serverId={serverId} /> */}
    {type === "channel" && (
      <BiHash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
    )}
    {type === "conversation" && (
      <Avatar className='mr-2 w-8 h-8'>
      <AvatarImage src={imageUrl}/>
      <AvatarFallback>{`${name[0]}${name[name.length - 1]}`}</AvatarFallback>
    </Avatar>  
    )}
    <p className="font-semibold text-md text-black  dark:text-white">
      {name}
    </p>
    <div className="ml-auto flex items-center">
      {type === "conversation" && (
        <ChatVideoButton />
      )}
      <SocketIndicator />
    </div>
  </div>
  )
}

export default Chatheader