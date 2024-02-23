import React from 'react'
import MessageBox from './MessageBox'

const MessagesContainer = () => {
  return (
    <>
      <div className='mt-5 mx-2 border-t-[1px] border-gray-500'>
        <MessageBox />
        <MessageBox />
        <MessageBox />
        <MessageBox />
        <MessageBox />

      </div>
    </>
  )
}

export default MessagesContainer