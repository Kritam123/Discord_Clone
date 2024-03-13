"use client";

import { useSocket } from "@/context/Socket-Provider";
import { Badge } from "@/components/ui/badge"


export const SocketIndicator = () => {
    const { isConnected } = useSocket();

    if (!isConnected) {
        return (
            <Badge
                title="connected"
                className="bg-yellow-600 text-white border-none"
            >
               <span className="max-[600px]:hidden block"> Fallback: Polling every 1s</span>
               <span className="min-[600px]:hidden block"> Polling </span>
            </Badge>
        )
    }

    return (
        <Badge
            title="connected"
            className="bg-emerald-600 text-white border-none"
        >
            <span className="max-[600px]:hidden block">  Live: Real-time updates</span>
               <span className="min-[600px]:hidden block"> Live </span>
           
        </Badge>
    )
}