import React from "react";
import Header from "@/components/User/components/Header";
import FindFriends from "@/components/User/components/FindFriends";
import UserList from "@/components/User/components/UserList";
import UserFooter from "@/components/User/components/UserFooter";
import { currentProfile } from "@/lib/getCurrentUser";
import { getAllConversationofCurrentUser } from "@/lib/conversation";
const UserSidebar = async() => {
  const profile = await currentProfile();
  const getConversations = await getAllConversationofCurrentUser(profile?.id!);
  return (
    <>
      <div className=" dark:bg-[#2B2D31] bg-white dark:border-gray-700  border-r border-gray-200  fixed inset-y-0 pb-20 lg:pb-0  lg:w-60 lg:block   block">
        <Header/>
        <FindFriends/>
        <UserList getConversations={getConversations}/>
        <UserFooter user={profile}/>
      </div>
    </>
  );
};

export default UserSidebar;
