"use client";
import Image from "next/image";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import clsx from "clsx";
interface AvatarServerProps {
    id: string;
    image: string;
    name: string;
    invite: string;
}

const AvatarServer: React.FC<AvatarServerProps> = ({
    id,
    image,
    name,
    invite,
}) => {
    const router = useRouter();
    const params = useParams();
    const handleServerRoute = () => {
        router.push(`/servers/${id}`);
    };
    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <button
                            onClick={handleServerRoute}
                            className="group relative flex items-center"
                        >
                            <div
                                className={clsx(
                                    "absolute left-0 dark:bg-white hover:bg-gray-800 bg-gray-800 rounded-r-full transition-all w-[4px]",
                                    params?.serverId !== id && "group-hover:h-[20px]",
                                    params?.serverId === id ? "h-[36px]" : "h-[8px]"
                                )}
                            />
                            <div
                                className={clsx(
                                    "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                                    params?.serverId === id &&
                                    "bg-primary/10 text-primary rounded-[16px]"
                                )}
                            >
                                <Image fill src={image} alt="Channel" />
                            </div>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{name}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>


        </>
    );
};

export default AvatarServer;
