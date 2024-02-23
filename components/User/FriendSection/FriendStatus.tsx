import React from 'react'

const FriendStatus = () => {
  return (
    <div className='px-5 py-4'>
        <h1 className='text-xl text-gray-700 dark:text-white font-semibold'>Active Now</h1>
        <div className='flex px-2 flex-col justify-center mt-8 w-full '>
            <span className='text-center mb-1 text-gray-600 dark:text-white'>It&apos;s quiet for now...</span>
            <p className='text-center leading-4 text-[14px] text-gray-600 dark:text-gray-400'>when a friend start an activity--like playing a game or hanging out on voice--we&apos;ll show it there!</p>
        </div>
    </div>
  )
}

export default FriendStatus