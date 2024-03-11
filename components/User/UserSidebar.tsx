'use client'
import React from "react";
import Header from "@/components/User/components/Header";
import FindFriends from "@/components/User/components/FindFriends";
import UserList from "@/components/User/components/UserList";
import UserFooter from "@/components/User/components/UserFooter";
import { useDrawer } from "@/hooks/use-drawer-store";
import { cn } from "@/lib/utils";
import { IoIosClose } from "react-icons/io";
const UserSidebar = ({getConversations,profile}:any) => {

  const {isOpen,onClose,type}  =useDrawer();
  const openDrawer =  isOpen && type ==="openFriendsDrawer"
  return (
    <>
      <div className={cn("-translate-x-[100%]  dark:bg-[#2B2D31] bg-white dark:border-gray-700  border-r border-gray-200 fixed inset-y-0 pb-20 lg:pb-0 z-[100]  w-60 lg:translate-x-0 ",openDrawer && "translate-x-[4rem]")}>
        <button onClick={()=>onClose()} className="w-8 flex justify-center  items-center ml-2 mt-1 h-8  lg:hidden  bg-gray-800 rounded-full px-1 py-1 ">
          <IoIosClose className="text-2xl text-white"/>
        </button>
        <Header/>
        <FindFriends/>
        <UserList user={profile} getConversations={getConversations} />
        <UserFooter user={profile}/>
      </div>
    </>
  );
};

export default UserSidebar;
