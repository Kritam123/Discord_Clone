'use client'

import React from 'react'
import { SibarIcons } from "@/utils/ServerSidebarIcon";
import AddBox from '../avatars/AddBox';
const AddServer = () => {
  return (
    <>
    {SibarIcons.map(({icon,tooltip},i) => (
        <AddBox key={i} icon ={icon} tooltip={tooltip} />
      ))}
    </>
    
  )
}

export default AddServer
