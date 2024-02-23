"use client";
import React, { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { useModal } from "@/hooks/use-model-store";
import { Server } from "@prisma/client";
type ServerSearchProps = {
  server: Server
  data: {
    label: string;
    type: "channel" | "member";
    data:
    | {
      icon: React.ReactNode;
      name: string;
      id: string;
    }[]
    | undefined;
  }[];
};
const ServerSearch = ({ server, data }: ServerSearchProps) => {
  const { onOpen } = useModal();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.ctrlKey) {
        e.preventDefault();
        onOpen("searchannel", { searchProps: data, server });
      }
    }

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down)
  }, [data,onOpen,server]);


  return (
    <>
      <button
        onClick={() => onOpen("searchannel", { searchProps: data, server })}
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
      >
        <BsSearch className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
          Search
        </p>
        <kbd className="pointer-events-none text-black dark:text-white inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-xs  text-black dark:text-white">⌘</span>K
        </kbd>
      </button>
    </>
  );
};

export default ServerSearch;
