"use client";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-model-store";
import { toast } from "sonner";
import { deleteChannelAction } from "@/actions/channel";

const DeleteChannel = ()=>{
    const { isOpen, type, onClose, data } = useModal();
    const isModalOpen = isOpen && type === "deleteChannel";
    const { server,channel } = data;
    const serverId = server?.id;
    const channelId = channel?.id;
    const [isLoading, setIsLoading] = React.useState(false);
    const handleDeleteChannel = async () => {
        try {
           const response =   await deleteChannelAction(serverId as string,channelId as string);
            setIsLoading(true);
            onClose();
           response &&  toast.success(`Delete Channel ${channel?.name}`)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="mt-5 text-center text-2xl font-bold">   Delete Channel</DialogTitle>
                <DialogDescription className="text-center  leading-4 text-gray-500 mt-3 text-sm">
                Are you sure you want to do this? <br />
          <span className="text-indigo-500 font-semibold">
            {channel?.name}
          </span>{" "}
          will be permanently deleted.
                </DialogDescription>
            </DialogHeader>
            <div className="flex items-center px-10  mt-10 justify-between w-full">
        <button
          disabled={isLoading}
          className="px-3 py-3 bg-blue-500 text-white rounded-md"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          disabled={isLoading}
          className="px-3 py-3 bg-rose-500 text-white rounded-md"
          onClick={handleDeleteChannel}
        >
          Confirm
        </button>
      </div>
        </DialogContent>
    </Dialog>
    )
}
export default DeleteChannel