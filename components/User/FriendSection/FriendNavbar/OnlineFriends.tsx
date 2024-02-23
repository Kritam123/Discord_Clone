import Image from 'next/image'
import React from 'react'

const FriendAll = () => {
  return (
    <div className="flex flex-[2]  flex-col gap-4 border-r dark:border-gray-500 border-gray-300 justify-center items-center ">
    <Image
          width={450}
          height={450}
          src={"/images/b36de980b174d7b798c89f35c116e5c6.svg"}
          alt="svg"
        />
        <span className="dark:text-gray-400 text-gray-700 font-medium">No one&apos;s around to play with Wumpus.</span>
    
        </div>
  )
}

export default FriendAll