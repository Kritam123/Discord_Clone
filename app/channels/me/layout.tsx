import Sidebar from '@/components/Sidebar/Sidebar'
import UserSidebar from '@/components/User/UserSidebar'
import { db } from '@/lib/db'
import { currentProfile } from '@/lib/getCurrentUser'
import { redirect } from 'next/navigation'
import React from 'react'

const layout = async({ children }: { children: React.ReactNode ,params:{userId:string}}) => {
    const profile = await currentProfile();
    if(!profile){
        redirect("/sign-in");
    }
    const getConversations = await db.directConversation.findMany({
        where:{
          OR:[
            {
              ConversationOneId:profile?.id
            },
            {
              ConversationTwoId:profile?.id
            },
          ]
        },
        include:{
          conversationOne:true,
          conversationTwo:true
        }
      });
    return (
        <div>
            <Sidebar>
                <div className="flex h-full">
                    <UserSidebar profile={profile} getConversations={getConversations}/>
                    <div className="ml-16 lg:ml-60 w-full h-screen">
                    {children}
                    </div>
                </div>
            </Sidebar>
        </div>
    )
}

export default layout