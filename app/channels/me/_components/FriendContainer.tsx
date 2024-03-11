'use client';
import BodySection from '@/components/User/FriendSection/BodySection'
import FriendHeader from '@/components/User/FriendSection/FriendHeader'
import React, { useState } from 'react'
const FriendContainer = ({user}:any) => {
    const [active, setActive] = useState(0);
    return (
        <div  className='w-full '>
            <FriendHeader active={active} setActive={setActive} />
            <BodySection user={user} active={active} />
        </div>
    )
}

export default FriendContainer