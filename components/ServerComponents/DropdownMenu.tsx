"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TbFriends } from "react-icons/tb";
import { IoMdPersonAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { BiSolidLogOutCircle } from "react-icons/bi";
import { AiTwotoneDelete, AiOutlinePlus } from "react-icons/ai";
import { useModal } from "@/hooks/use-model-store";
import { Member, Server, User } from "@prisma/client";
import { Separator } from "../ui/separator";
interface DropdownMenuProps {
  isAdmin: boolean;
  isModerater: boolean;
  server: Server
}

export default function DropdownMenu({
  isAdmin,
  isModerater,
  server,
}: DropdownMenuProps) {
  const { onOpen } = useModal();
  return (
    <>
      <Menu as="div" className="relative w-full z-50 text-left">
        <Menu.Button className="flex w-full ">
          <div className="px-3 py-[0.8rem] cursor-pointer justify-between  flex w-full  dark:hover:bg-[#313338] hover:bg-[#f2f2f2]  border-b dark:border-black">
            <div className="flex justify-between w-full">
              <span className=" text-black dark:text-white">{server?.name}</span>
              <MdKeyboardArrowDown
                className="ml-2 -mr-1  h-6 w-6 text-black  dark:text-violet-200 dark:hover:text-violet-100"
                aria-hidden="true"
              />
            </div>
          </div>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 mt-2 w-full origin-bottom-left divide-y divide-gray-100 rounded-md bg-white  dark:bg-[#111214] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-2 py-2 space-y-2 max-h-fit ">
              {isModerater && (
                <>
                  <Menu.Item>
                    <button
                      onClick={() => onOpen("invite", { server })}
                      className="flex items-center group px-2 py-2 rounded-sm hover:bg-[#5865F2]  justify-between w-full"
                    >
                      <span className="text-[#949CF7] text-sm group-hover:text-gray-100  ">
                        Invite People
                      </span>
                      <IoMdPersonAdd className="w-4 h-4 group-hover:text-gray-100 text-[#949CF7]" />
                    </button>
                  </Menu.Item>
                  <Separator className="bg-gray-600" />
                </>
              )}
              {isAdmin && (
                <>
                  <Menu.Item>
                    <button
                      onClick={() => onOpen("members", { server })}
                      className="flex items-center group px-2 py-2 rounded-sm hover:bg-[#5865F2]  justify-between w-full"
                    >
                      <span className="text-gray-400 text-sm group-hover:text-gray-100  ">
                        Manage Members
                      </span>
                      <TbFriends className="w-4 h-4 group-hover:text-gray-100 text-gray-400" />
                    </button>
                  </Menu.Item>
                  <Separator className="bg-gray-600" />
                </>
              )}
              {isModerater && (
                <>
                  <Menu.Item>
                    <button
                      onClick={() => onOpen("createChannel")}
                      className="flex items-center group px-2 py-2 rounded-sm hover:bg-[#5865F2]  justify-between w-full">
                      <span className="text-gray-400 text-sm group-hover:text-gray-100  ">
                        Create Channel
                      </span>
                      <AiOutlinePlus className="w-4 h-4 group-hover:text-gray-100 text-gray-400" />
                    </button>
                  </Menu.Item>
                  <Separator className="bg-gray-600" />
                </>
              )}
              {isModerater && (
                <>
                  <Menu.Item>
                    <button
                      onClick={() => onOpen("editServer", { server })}
                      className="flex items-center group px-2 py-2 rounded-sm hover:bg-[#5865F2]  justify-between w-full">
                      <span className="text-gray-400 text-sm group-hover:text-gray-100  ">
                        Edit Server
                      </span>
                      <FaEdit className="w-4 h-4 group-hover:text-gray-100 text-gray-400" />
                    </button>
                  </Menu.Item>
                  <Separator className="bg-gray-600" />
                </>
              )}
              {isAdmin && (
                <>
                  <Menu.Item>
                    <button
                      onClick={() => onOpen("deleteServer", { server })}
                      className="flex items-center group px-2 py-2 rounded-sm hover:bg-[#D83A3D]  justify-between w-full">
                      <span className=" text-sm group-hover:text-gray-100  text-[#D83A3D] ">
                        Delete Server
                      </span>
                      <AiTwotoneDelete className="w-4 h-4 group-hover:text-gray-100 text-[#D83A3D]" />
                    </button>
                  </Menu.Item>
                  <Separator className="bg-gray-600" />
                </>
              )}
              {!isAdmin && (
                <>
                  <Menu.Item>
                    <button
                      onClick={() => onOpen("leaveServer", { server })}
                      className="flex items-center group px-2 py-2 rounded-sm hover:bg-[#D83A3D]  justify-between w-full">
                      <span className=" text-sm group-hover:text-gray-100  text-[#D83A3D] ">
                        Leave Server
                      </span>
                      <BiSolidLogOutCircle className="w-4 h-4 group-hover:text-gray-100 text-[#D83A3D]" />
                    </button>
                  </Menu.Item>
                  <Separator className="bg-gray-600" />
                </>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
