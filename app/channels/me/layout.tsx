import Sidebar from '@/components/Sidebar/Sidebar'
import UserSidebar from '@/components/User/UserSidebar'
import { currentProfile } from '@/lib/getCurrentUser'
import { redirect } from 'next/navigation'
import React from 'react'

const layout = async({ children }: { children: React.ReactNode ,params:{userId:string}}) => {
    const profile = await currentProfile();
    if(!profile){
        redirect("/sign-in");
    }
    
    return (
        <div>
            <Sidebar>
                <div className="flex h-full">
                    <UserSidebar />
                    <div className="ml-60 border w-[calc(100%-240px)] h-screen">
                    {children}
                    </div>
                </div>
            </Sidebar>
        </div>
    )
}

export default layout