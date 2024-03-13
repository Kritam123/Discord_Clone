'use client'
import HomeDrawer from "@/components/Drawer/HomeDrawer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
    const router =  useRouter();
    const handleRoute = ()=>{
        router.push("/channels/me");
    }
    return (
        <div className="flex justify-between items-center w-full  ">
            <div className="flex items-center gap-2">
                <Image
                    className=""
                    width={40}
                    height={40}
                    src={"/logo.png"}
                    alt="Navbar_Icon"
                    color="#fff"
                />
                <span className="text-white text-xl">Discord</span>
            </div>
            <nav className="max-lg:hidden">
                <ul className="flex space-x-10 ">
                    <li><a className="text-white hover:underline" href="">Download</a></li>
                    <li><a className="text-white hover:underline" href="">Nitro</a></li>
                    <li><a className="text-white hover:underline" href="">Discover</a></li>
                    <li><a className="text-white hover:underline" href="">Safety</a></li>
                    <li><a className="text-white hover:underline" href="">Support</a></li>
                    <li><a className="text-white hover:underline" href="">Blog</a></li>
                    <li><a className="text-white hover:underline" href="">Careers</a></li>
                </ul>
            </nav>
            <div className="flex gap-5 items-center ">
                {/* button Join */}
                <button onClick={handleRoute} className="outline-none hover:text-cyan-500 hover:shadow-lg block  border-none px-3 py-2 text-[14px] text-gray-500 rounded-2xl bg-white shadow-md">
                    Open Discord
                </button>
                {/* hambaurger */}
                
                <HomeDrawer>
                    <GiHamburgerMenu className="w-8 h-8 lg:hidden text-white cursor-pointer" />
                </HomeDrawer>
            </div>
        </div>
    )
}

export default Navbar