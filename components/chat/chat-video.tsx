"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BiSolidVideo, BiSolidVideoOff } from "react-icons/bi"
import TooltipContext from "../use-tooltip";


export const ChatVideoButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isVideo = searchParams?.get("video");

  const onClick = () => {
    const url = qs.stringifyUrl({
      url: pathname || "",
      query: {
        video: isVideo ? undefined : true,
      }
    }, { skipNull: true });

    router.push(url);
  }

  const Icon = isVideo ? BiSolidVideoOff : BiSolidVideo;
  const tooltipLabel = isVideo ? "End video call" : "Start video call";

  return (
    <TooltipContext content={tooltipLabel}>
      <button onClick={onClick} className="hover:opacity-75 transition mr-4">
        <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
      </button>
    </TooltipContext>
  )
}