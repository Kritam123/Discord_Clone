import React, { useState } from "react";
import Link from "next/link";
import {drawerItem} from "@/utils/HomeServices"
 import clsx from "clsx";


const DrawerItem = () => {
  return (
    <>
      <div>
        {
            drawerItem.map((item,i)=>(
                <div  className={clsx("px-5 py-2 rounded-md",i==0?"bg-[#F6F6F6] text-cyan-400":"" )} key={i}>
                    <Link className="flex items-center gap-1 hover:underline font-extralight" href={item.href}>
                        <span>
                        {item.name}
                        </span>
                       { item.name =="Safety" && <item.icon className="w-3 h-3"/>}
                    </Link>
                </div>
            ))
        }
      </div>
    </>
  );
};

export default DrawerItem;
