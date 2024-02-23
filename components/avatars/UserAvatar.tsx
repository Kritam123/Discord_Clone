'use client'
import React from 'react'
import Image from "next/image";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface AvatarUserProps {
    src: string;
}
const UserAvatar = ({ src }: AvatarUserProps) => {
    const router = useRouter();
    const handleClick = ()=>{
      router.push("/channels/me");
    }
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <button onClick={handleClick} className="group relative flex items-center">
                        <div
                            className={cn(
                                "absolute left-0 bg-white border-red-400  rounded-r-full transition-all w-[4px]"
                            )}
                        />
                        <div
                            className={cn(
                                "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden"
                            )}
                        >
                            <Image fill src={src} alt="Channel" />
                        </div>
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Direct Message</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}

export default UserAvatar