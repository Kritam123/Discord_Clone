'use client'
import React from 'react'

const Header = () => {
  return (
    <div
    className='px-2 py-[0.6rem] border-b dark:border-black border-gray-300'
    >
        <button
        // todo:open a model to search an conversations
        onClick={()=>{}}
        className='dark:text-gray-400 text-gray-100 text-left px-2 text-sm font-extralight rounded-md bg-[#1E1F22] w-full  py-1'
        >
            Find or start a conversation
        </button>
    </div>
  )
}

export default Header