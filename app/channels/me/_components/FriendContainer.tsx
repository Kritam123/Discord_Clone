'use client';
import BodySection from '@/components/User/FriendSection/BodySection'
import FriendHeader from '@/components/User/FriendSection/FriendHeader'
import { useSocket } from '@/context/Socket-Provider';
import React, { useState } from 'react'
const FriendContainer = ({user}:any) => {
    const [active, setActive] = useState(0);
    const {setUserId} =  useSocket();
    setUserId(user?.id)
    return (
        <div>
            <FriendHeader setActive={setActive} />
            <BodySection user={user} active={active} />
        </div>
    )
}

export default FriendContainer