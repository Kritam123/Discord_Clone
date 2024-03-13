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
               <span className="md:block hidden"> Fallback: Polling every 1s</span>
               <span className="md:hidden block"> Polling </span>
            </Badge>
        )
    }

    return (
        <Badge
            title="connected"
            className="bg-emerald-600 text-white border-none"
        >
            <span className="md:block hidden">  Live: Real-time updates</span>
               <span className="md:hidden block"> Live </span>
           
        </Badge>
    )
}