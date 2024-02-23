import React from 'react'
import MessagesBox from './MessagesBox'
import UserProfileBox from './UserProfileBox'

const UserBody = () => {
  return (
    <div
    className='bg-[#313338]  flex h-[calc(100vh-3rem)] w-full'
    >
      <div className="flex-[2] flex  w-full">
        <MessagesBox/>
      </div>
      <div className="flex-1 flex w-full ">
        {/* <UserProfileBox/> */}
      </div>

    </div>
  )
}

export default UserBody