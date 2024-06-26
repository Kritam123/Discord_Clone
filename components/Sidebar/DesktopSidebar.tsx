import React from 'react'
import UserAvatar from '../avatars/UserAvatar'
import AvatarServer from '../avatars/AvatarServer'
import { currentProfile } from '@/lib/getCurrentUser';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import AddServer from './AddServer';
import { ModeToggle } from '../toggle-mode';

const DesktopSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {

      members: {
        some: {
          userId: profile.id
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return (
    <>
      <div className=" overflow-hidden   dark:border-none border-r border-gray-200 dark:shadow-none shadow-sm fixed inset-y-0  z-40 w-[4rem] sm:w-[4.5rem]  overflow-y-auto  bg-[#fff] dark:bg-[#1e1f22]  pb-4 flex flex-col gap-1">
        <div className="mt-4 flex lg:justify-center">
          <UserAvatar src={profile.image!} />
        </div>
        <div className="flex flex-col px-6 py-2 gap-4">
          <div className="border-t-[2px] py-3 gap-4 flex flex-col border-gray-600 border-b-[2px]">
            <ul className="flex flex-col items-center gap-4">
              {servers.map(({ id, imgUrl, name, inviteCode }) => (
                <AvatarServer key={id} id={id} image={imgUrl} name={name} invite={inviteCode} />
              ))}
            </ul>
            <ul className="flex justify-center items-center  flex-col gap-3">
              <AddServer />
            </ul>
          </div>
        </div>
        <div className='flex ml-3 items-center'>
        <ModeToggle/>
        </div>
      </div>
    </>
  )
}

export default DesktopSidebar