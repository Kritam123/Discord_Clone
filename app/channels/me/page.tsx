import React from "react";
import type { Metadata } from "next";
import FriendContainer from "./_components/FriendContainer";
import { currentProfile } from "@/lib/getCurrentUser";
export const metadata: Metadata = {
  title: "(150) Discord | Friends",
  description: "Generated by create next app",
};
const page = async() => {
  const profile = await currentProfile();
  return (
    <div >
      <FriendContainer user={profile}/>
    </div>
  );
};
export default page;
