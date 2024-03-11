"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useModal } from "@/hooks/use-model-store";

interface AddBoxProps {
  icon: any;
  tooltip: string;
}
const AddBox: React.FC<AddBoxProps> = ({ icon: Icon, tooltip }) => {
  const { onOpen } = useModal();
  return (
    <div className="relative group cursor-pointer">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <button 
            onClick={tooltip === "Add a Server" ? () => onOpen("server"):()=>{}}
            className=" group flex items-center justify-center hover:bg-[#23A559] hover:rounded-xl bg-[#313338]  rounded-full overflow-hidden h-11 w-11">
              {tooltip !== "Add a Server" && (
                <div className="absolute  group-hover:h-[20px] bg-gray-800 dark:hover:bg-gray-800  left-[-10px] top-[15px] z-40 transition-all  dark:bg-slate-100 h-[10px] w-[5px] rounded-r-full " />
              )}
              <Icon className=" text-[#23A559] group-hover:text-white w-5 h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default AddBox;
