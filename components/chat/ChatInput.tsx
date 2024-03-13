"use client";
import React, { useState } from "react";
import { AiOutlinePlusCircle, AiFillGift } from "react-icons/ai";
import axios from "axios";
import { BsStickyFill } from "react-icons/bs";
import qs from "query-string";
import { useModal } from "@/hooks/use-model-store";
import { EmojiPicker } from "../emoji-picker";
import { cn } from "@/lib/utils";
interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel" | "Friends";
}
const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const { onOpen } = useModal();
  const [value, setValue] = useState<string>("");
  const onSubmit = async (value: string) => {
    if (!value) return;
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });

      await axios.post(url, { value });
      setValue("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={cn("px-5 bg-white dark:bg-[#565656]  py-2 ", type === "conversation" && "absolute  bottom-[1px] left-0 right-0")}>
      <div className=" px-3 gap-4 flex items-center rounded-md   bg-[#383A40] ">
        <button onClick={() => onOpen("messageFile", { apiUrl, query })}>
        <AiOutlinePlusCircle className="w-8 h-8 text-gray-400 hover:text-white cursor-pointer" />
        </button>
        <input
          placeholder={`Message ${type === "conversation" ? name : "#" + name}`}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? onSubmit(value) : null)}
          className="w-full placeholder:sm:text-[14px] text-[12px] bg-transparent text-gray-300  px-2 py-2 outline-none border-none"
        />
        <AiFillGift className="w-8 h-8 sm:block hidden text-gray-400 hover:text-white cursor-pointer" />
        <EmojiPicker
          onChange={(emoji: string) => setValue(`${value}${emoji}`)}
        />
        <button onClick={() => onOpen("messageFile", { apiUrl, query })}>
          <BsStickyFill className="w-8 h-8 text-gray-400 hover:text-white cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
