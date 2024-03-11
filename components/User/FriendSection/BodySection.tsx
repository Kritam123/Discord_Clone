import React, { useState } from "react";
import FriendStatus from "./FriendStatus";
import OnlineFriends from "./FriendNavbar/OnlineFriends";
import AllFriends from "./FriendNavbar/AllFriends";
import Pending from "./FriendNavbar/Pending";
import Blocked from "./FriendNavbar/Blocked";
import AddFriends from "./FriendNavbar/AddFriends";
interface BodySectionProps {
    active: number
    user:any
}
const BodySection = ({ active,user }: BodySectionProps) => {
    return ( 
        <div className="dark:bg-[#313338] w-full bg-white overflow-hidden flex h-[calc(100vh-3rem)] ">
            {
                active === 0 && <OnlineFriends profile={user} />
            }
            {
                active === 1 && <AllFriends profile={user}/>
            }
            {
                active === 2 && <Pending profile={user} />
            }
            {
                active === 3 && <Blocked />
            }
            {
                active === 4 && <AddFriends user= {user} />
            }


            <div className="flex-1 max-[780px]:hidden flex">
                <FriendStatus />
            </div>
        </div>

    );
};

export default BodySection;
