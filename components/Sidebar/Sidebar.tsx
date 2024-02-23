import React from 'react'
import DesktopSidebar from './DesktopSidebar'

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full ">
      <DesktopSidebar />
      {/* <MobileFooter /> */}
      <main className="lg:pl-[4.5rem] h-full">{children}</main>
    </div>
  )
}

export default Sidebar;