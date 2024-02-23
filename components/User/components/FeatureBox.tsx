'use client'

import clsx from 'clsx'
import React, { useState } from 'react'
interface FreatrueProps{
    icon:any,
    name:string,
    index:number
}
const FeatureBox:React.FC<FreatrueProps> = ({icon:Icon,name,index}) => {
    const [selected, setSelected] = useState(0)
  return (
    <div
    onClick={()=>setSelected(index)}
    className={clsx(`flex group cursor-pointer rounded-md transition dark:hover:bg-[#3a3d40] hover:bg-[#f2f2f2] px-3 py-2  items-center gap-3`,selected===index && 'dark:bg-[#404249] bg-[#f2f2f2]')}
    >
    <Icon className={clsx(`dark:group-hover:text-white group-hover:text-black dark:text-gray-400 text-gray-700 w-5 h-5`,selected===index && 'dark:text-white text-black')} />
        <span className={clsx('dark:group-hover:text-white group-hover:text-black dark:text-gray-400 text-gray-700',selected ===index && 'dark:text-white text-black')}>{name}</span>
    </div>
  )
}

export default FeatureBox