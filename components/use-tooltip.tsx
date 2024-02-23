import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
const TooltipContext = ({ children,content,className }: { children: React.ReactNode,content:string,className?:string }) => {
  return (
    <TooltipProvider>
  <Tooltip>
    <TooltipTrigger  className={className} >{children}</TooltipTrigger>
    <TooltipContent>
      <p>{content}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

  )
}

export default TooltipContext