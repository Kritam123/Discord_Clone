'use client'
import React from 'react'
import FeatureBox from './FeatureBox'
import { FeatuerIcon } from '@/utils/ServerSidebarIcon'

const FindFriends = () => {
  return (
    <div
    className='space-y-1 px-2 py-2'
    >
        {
            FeatuerIcon.map((item,i)=>(
                <FeatureBox key={i} index={i} icon= {item.icon} name= {item.name}/>
            ))
        }

    </div>
  )
}

export default FindFriends