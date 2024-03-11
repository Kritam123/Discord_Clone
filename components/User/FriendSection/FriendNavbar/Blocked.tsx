import Image from 'next/image'
import React from 'react'

const Blocked = () => {
  return (
    <div className="flex flex-[2]  flex-col gap-4 border-r border-gray-500 justify-center items-center ">
    <Image
          width={250}
          height={250}
          className=' lg:w-[450px] lg:h-[450px]'
          src={"/images/8c998f8fb62016fcfb4901e424ff378b.svg"}
          alt="svg"
        />
        <span className="dark:text-gray-400 text-gray-700 font-medium">You can&apos;t unblock the Wumpus.</span>
    
        </div>
  )
}

export default Blocked