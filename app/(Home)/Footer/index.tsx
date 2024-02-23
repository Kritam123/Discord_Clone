import React from "react";
import {
  BsTwitter,
  BsInstagram,
  BsFacebook,
  BsYoutube,
  BsTiktok,
} from "react-icons/bs";
import Image from "next/image"
import { FooterLinks } from "@/utils/HomeServices";
import { Separator } from "@/components/ui/separator";
const Footer = () => {
  return (
    <div className="bg-[#23272A]">
    <div className="px-7 2xl:px-28 py-20">
      <div className=" flex flex-col md:flex-row  gap-14 md:gap-52 ">
        <div className="flex flex-col  gap-10">
          <div className="">
            {/*  */}
            <span className="text-white"> English,USA</span>
          </div>
          <div className="flex gap-8 items-center">
            <BsTwitter className="text-white cursor-pointer  text-2xl" />
            <BsInstagram className="text-white cursor-pointer text-2xl" />
            <BsFacebook className="text-white cursor-pointer text-2xl" />
            <BsYoutube className="text-white cursor-pointer text-2xl" />
            <BsTiktok className="text-white cursor-pointer text-2xl" />
          </div>
        </div>
        <div className="grid lg:grid-cols-4 gap-10 grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="text-md text-[#395BE5]">Product</span>
            <ul className="space-y-3">
              {FooterLinks[0].map((item,i) => (
                <li key={i}>
                  <a className="text-white hover:underline" href={item.href}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-md text-[#395BE5]">Company</span>
            <ul className="space-y-3">
              {FooterLinks[1].map((item) => (
                <li key={item as any}>
                  <a className="text-white  hover:underline" href={item.href}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-md text-[#395BE5]">Resources</span>
            <ul className="space-y-3">
              {FooterLinks[2].map((item,i) => (
                <li key={i } >
                  <a className="text-white  hover:underline" href={item.href}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-md text-[#395BE5]">Policies</span>
            <ul className="space-y-3">
              {FooterLinks[3].map((item,i) => (
                <li key={i}>
                  <a className=" hover:underline text-white" href={item.href}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Separator className="mt-10 bg-[#395BE5]"/>
      <div className="flex mt-8 justify-between">
                  <div className="flex items-center gap-2">
                      <Image src={"/images/discord.png"} alt="discord Icon" width={40} height={40}/>
                      <span className="text-white text-xl font-semibold">Discord</span>
                  </div>
                  {/* button */}
                  <button className="px-3 text-white font-extralight rounded-3xl py-2 bg-[#395BE5]">
                      Open Discord
                  </button>
      </div>
    </div>
  </div>
  )
}

export default Footer