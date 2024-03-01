'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React, { useState } from 'react'
interface FreatrueProps{
    icon:any,
    name:string,
    index:number,
    href:string
}
const FeatureBox:React.FC<FreatrueProps> = ({icon:Icon,name,index,href}) => {
    const pathname  = usePathname()
  return (
    <Link
    href={href}
    className={clsx(`flex group cursor-pointer rounded-md transition dark:hover:bg-[#3a3d40] hover:bg-[#f2f2f2] px-3 py-2  items-center gap-3`,pathname===href && 'dark:bg-[#404249] bg-[#f2f2f2]')}
    >
    <Icon className={clsx(`dark:group-hover:text-white group-hover:text-black dark:text-gray-400 text-gray-700 w-5 h-5`,pathname===href && 'dark:text-white text-black')} />
        <span className={clsx('dark:group-hover:text-white group-hover:text-black dark:text-gray-400 text-gray-700',pathname ===href && 'dark:text-white text-black')}>{name}</span>
    </Link>
  )
}

export default FeatureBox