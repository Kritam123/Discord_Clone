"use client"
import React from 'react'
import Image from "next/image";
import { BsDownload } from "react-icons/bs";
import { useRouter } from 'next/navigation';
const HomeComponent = () => {
  const router =  useRouter();
    const handleRoute = ()=>{
        router.push("/channels/me");
    }
  return (
    <>
         <div className="mt-16 z-50  text-start lg:text-center">
          <h1 className="text-3xl lg:px-10 md:text-7xl sm:text-7xl text-white font-extrabold">
            IMAGINE A PLACE...
          </h1>
          <p className="mt-5 lg:text-xl w-full  text-white leading-7 text-[15px]  md:text-[18px] font-extralight ">
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community. Where just you and a handful of friends
            can spend time together. A place that makes it easy to talk every
            day and hang out more often.
          </p>
          <div className="flex  z-40 justify-center sm:flex-col  flex-col  md:flex-row  mt-5  gap-5 ">
            <button
              className="flex cursor-pointer hover:shadow-lg group transition hover:text-cyan-600
               items-center gap-3 px-5 py-5 sm:py-[17px]  rounded-[50px]  w-fit  bg-white"
            >
              <BsDownload className="w-6 h-6" />
              <span className="text-gray-600 group-hover:text-cyan-600 text-xl ">
                Download for Windows
              </span>
            </button>
            <button onClick={handleRoute} className="flex cursor-pointer px-5  hover:shadow-md w-fit hover:bg-gray-800 text-xl text-white rounded-[50px] py-5 sm:py-[17px]   bg-[#313338]">
              Open Discord In your browser
            </button>
          </div>
        </div>
        <div className=" relative  flex justify-between h-[20rem] ">
            <div className="md:block 2xl:right-[300px] md:left-[-280px]  sm:hidden 2xl:absolute lg:top-[10px] lg:right-[400px]  h-full w-full absolute right-20 top-8">
              <Image
                className=" h-full w-fit "
                width={70}
                height={70}
                src={"/bg3.svg"}
                alt="HeaderPic"
              />
            </div>
            <div className="h-full hidden sm:block sm:absolute  top-0 right-[-250px]">
              <Image
                className=" h-full w-fit"
                width={70}
                height={70}
                src={"/bg2.svg"}
                alt="HeaderPic"
              />
            </div>
          </div>
    </>
  )
}

export default HomeComponent