import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import { Separator } from '../ui/separator'
import DrawerItem from './DrawerItem'

const HomeDrawer = ({ children }: { children: React.ReactNode }) => {
    return (
        <Sheet>
            <SheetTrigger>{children}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="flex w-full items-center px-5 py-5 justify-between">
                        <div className="flex items-center gap-2">
                            <Image
                                alt="DrawerIcon"
                                height={35}
                                width={35}
                                src={"/images/discord.png"}
                            />
                            <span className="text-2xl font-semibold">Discord</span>
                        </div>

                    </SheetTitle>
                </SheetHeader>
                <div className="px-8 pr-16">
                    <DrawerItem />
                </div>
            </SheetContent>
        </Sheet>

    )
}

export default HomeDrawer