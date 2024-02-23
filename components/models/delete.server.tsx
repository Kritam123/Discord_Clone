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
import { useRouter } from "next/navigation";
import { deleteServerAction } from "@/actions/server";
const DeleteServer = () => {
    const router = useRouter();
    const { isOpen, type, onClose, data } = useModal();
    const isModalOpen = isOpen && type === "deleteServer";
    const { server } = data;
    const serverId = server?.id;
    const [isLoading, setIsLoading] = React.useState(false);
    const handleDeleteServer = async () => {
        try {
            await deleteServerAction(serverId as string);
            setIsLoading(true);
            onClose();
            toast.success(`Delete Server ${server?.name}`)
            router.push("/channels/me");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mt-5 text-center text-2xl font-bold">   Delete Server</DialogTitle>
                    <DialogDescription className="text-center  leading-4 text-gray-500 mt-3 text-sm">
                    Are you sure you want to do this? <br />
              <span className="text-indigo-500 font-semibold">
                {server?.name}
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
              onClick={handleDeleteServer}
            >
              Confirm
            </button>
          </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteServer