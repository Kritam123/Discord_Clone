import React from 'react'
import DesktopSidebar from './DesktopSidebar'

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full">
      <DesktopSidebar />
      {/* <MobileFooter /> */}
      <main className=" w-full lg:pl-[4.5rem] h-full">{children}</main>
    </div>
  )
}

export default Sidebar;