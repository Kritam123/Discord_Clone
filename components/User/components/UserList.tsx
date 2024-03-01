'use client'
import React from 'react'
import { BsPlus } from "react-icons/bs"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import UserBox from './UserBox';
const UserList =({getConversations,user}:any) => {

    return (
        <div className='mt-5 px-2'>
            <div className="flex justify-between pl-3 pr-1 ">
                {/* create friends */}
                <span className='dark:text-gray-400 text-sm dark:hover:text-white text-black '>Direct Message</span>
                {/* icon */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div>
                                <BsPlus className='w-6 h-6  cursor-pointer text-black dark:text-white' />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Create DM</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className='space-y-1'>
                {
                    getConversations?.map((conversation:any) => (
                        <UserBox  user={user} key={conversation.id} conversation={conversation} />
                    ))
                }
            </div>
        </div>
    )
}

export default UserList