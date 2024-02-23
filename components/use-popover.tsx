import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  
const PoPoverProvider = ({children,WrapperComponent}:{children:React.ReactNode,WrapperComponent:React.ComponentType}) => {
  
  return (
    <Popover>
    <PopoverTrigger>{children}</PopoverTrigger>
    <PopoverContent className='w-fit'><WrapperComponent/></PopoverContent>
  </Popover>
  
  )
}

export default PoPoverProvider