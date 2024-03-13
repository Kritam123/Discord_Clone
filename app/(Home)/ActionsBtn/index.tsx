import React from 'react'
import { BsDownload } from 'react-icons/bs'

const Actions = () => {
    return (
        <div className="flex bg-[#F6F6F6]  bg-star-bg bg-contain bg-no-repeat  bg-top px-10 py-20 space-y-14 text-center flex-col w-full sm:items-center justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-black ">Ready to start your journey?</h1>
            <button className="flex sm:w-fit items-center  hover:shadow-md hover:bg-[#747de2] text-white justify-center gap-2 px-10 py-4 rounded-3xl bg-[#5A67F2]">
                <BsDownload className="w-6 h-6 hidden sm:block text-[13px] text-sm" />
                <span className="text-xl">Download for Windows</span>
            </button>
        </div>
    )
}

export default Actions