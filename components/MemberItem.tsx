import { Member, MemberRole, Server, User } from "@prisma/client";
import { Menu, Transition } from "@headlessui/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { GoShieldCheck } from "react-icons/go";
import { LuLoader2, LuShieldAlert } from "react-icons/lu";
import { BsCheckSquareFill } from "react-icons/bs";
import { Fragment, useState } from "react";
import { HiUserRemove } from "react-icons/hi";
import { useModal } from "@/hooks/use-model-store";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { onKickAction, roleChangeAction } from "@/actions/member";
import { toast } from "sonner";
interface MemberItemProps {
  item: Member & { profile: User };
  server: Server;
}
const MemberItem = ({ item, server }: MemberItemProps) => {
  const [loadingId, setLoadingId] = useState("");
  const { onOpen } = useModal();
  const roleIconMap = {
    GUEST: null,
    MODERATOR: <GoShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    ADMIN: <LuShieldAlert className="h-4 w-4 text-rose-500" />,
  };
  let serverId = server.id;
  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const response = await onKickAction(serverId, memberId);
      toast.success("kicked user..")
      onOpen("members", { server: response as any });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  }
  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const response = await roleChangeAction(serverId , memberId,role);
      toast.success("update user")
      onOpen("members", { server: response as any });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  }
  return (
    <div className="flex justify-between items-center dark:hover:bg-gray-700 hover:bg-gray-200 cursor-pointer px-2 py-2 rounded-md ">
      <div className="flex gap-x-2 items-center">
        <Avatar>
          <AvatarImage className="w-10 h-10" src={item.profile.image!} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <div className="text-xs font-semibold flex items-center gap-x-1">
            {item.profile.username}
            {roleIconMap[item.role]}
          </div>
          <p className="text-xs text-zinc-500">{item.profile.email}</p>
        </div>
      </div>
      {server.creatorId !== item.userId && loadingId !== item.id && (
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button>
            <HiOutlineDotsVertical
              className="ml-2 -mr-1 h-5 w-5 text-gray-400 hover:text-gray-600"
              aria-hidden="true"
            />
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
            <Menu.Items className="absolute right-0 mt-2 w-36  origin-center divide-y divide-gray-100 rounded-md dark:bg-black bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  <button
                    onClick={() => onRoleChange(item.id, "GUEST")}
                    className="flex dark:hover:bg-gray-700 hover:bg-gray-200 w-full items-center px-1 py-1  ">
                    <GoShieldCheck className="h-4 w-4 mr-2" />
                    <span className="flex gap-x-2 items-center">
                      Guest
                      {item.role === "GUEST" && (
                        <BsCheckSquareFill className="h-4 w-4 ml-auto" />
                      )}
                    </span>
                  </button>
                </Menu.Item>
                <Separator />
                <Menu.Item>
                  <button
                    onClick={() => onRoleChange(item.id, "MODERATOR")}
                    className="flex items-center px-1 py-1 dark:hover:bg-gray-700  hover:bg-gray-200 w-full ">
                    <GoShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
                    <span className="flex items-center gap-x-1" >
                      Moderator
                      {item.role === "MODERATOR" && (
                        <BsCheckSquareFill className="h-4 w-4 ml-auto" />
                      )}
                    </span>
                  </button>
                </Menu.Item>
                <Separator />
                <Menu.Item>
                  <button
                    onClick={() => onKick(item.id)}
                    className="flex items-center dark:hover:bg-gray-700 hover:bg-gray-200 w-full px-1 py-1 ">
                    <HiUserRemove className="h-4 w-4 mr-2 text-rose-800" />
                    <span>kick</span>
                  </button>
                </Menu.Item>
                <Separator />
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
      {loadingId === item.id && (
        <LuLoader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
      )}
    </div>
  );
};

export default MemberItem;
