import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServerWithMembersWithProfiles } from '@/types';
import { useModal } from '@/hooks/use-model-store';
import MemberItem from '../MemberItem';

const MembersModel = () => {
  const { isOpen, data, type, onClose } = useModal();
  const { server } = data as {
    server: ServerWithMembersWithProfiles
  }

  const isModalOpen = isOpen && type == "members";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mt-5 text-center text-2xl font-bold">   Manage Memebers</DialogTitle>
          <DialogDescription className="text-center  leading-4 text-gray-500 mt-3 text-sm">
            {server?.members?.length} members
          </DialogDescription>
        </DialogHeader>
        <div className="mt-5 overflow-y-auto p-2   max-h-[500px] ">
          {server?.members?.map((item) => (
            <MemberItem server={server} key={item.id} item={item} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MembersModel