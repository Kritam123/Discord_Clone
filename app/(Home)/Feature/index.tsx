import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'
interface ServicesProps {
    img:string,
    title:string,
    description:string,
    index:number
}
const Feature:React.FC<ServicesProps> = ({img, index,title,description}) => {
  return (
    <div
    className={clsx('flex xl:px-24 2xl:px-36 lg:px-20  py-20 px-5 flex-col sm:gap-10 sm:px-10 justify-center items-center',index % 2 !=0 ?"bg-[#F6F6F6] sm:flex-row-reverse":"bg-white sm:flex-row",index==3?"flex px-0 sm:items-center sm:flex-col-reverse flex-col-reverse":"" )}
    >
        <div className="w-[100%] flex justify-center">
            <Image width={0} className='w-fit' height={0}  src={img} alt='serviceIcon'/>
        </div>
        <div className={clsx("space-y-5  mt-5",index==3?"text-center px-10":"")}>
            <h1 className={clsx('text-xl text-black sm:text-5xl  font-semibold',index==3?"text-4xl   font-extrabold":"")}>{title}</h1>
            <p className='font-light lg:text-xl text-black'>{description}</p>
        </div>
    </div>
  )
}

export default Feature