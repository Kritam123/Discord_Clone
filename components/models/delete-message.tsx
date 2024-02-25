"use client";
import React, { FormEvent } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-model-store";
import { toast } from "sonner";
import qs from "query-string";
import axios from "axios";

const DeleteMessage = ()=>{
    const { isOpen, type, onClose, data } = useModal();
    const isModalOpen = isOpen && type === "deleteMessage";
    const { apiUrl,query} = data;
    const [isLoading, setIsLoading] = React.useState(false);
    const handleDeleteMessage = async (e:FormEvent) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const url = qs.stringifyUrl({
          url: apiUrl || "",
          query,
        });
        await axios.delete(url);
        onClose();
      } catch (error) {
        console.log(error);
      }finally {
        setIsLoading(false);
      }
    };
    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="mt-5 text-center text-2xl font-bold">   Delete Message</DialogTitle>
                <DialogDescription className="text-center  leading-4 text-gray-500 mt-3 text-sm">
                Are you sure you want to do this? <br />
            The message will be permanently deleted.
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
          onClick={handleDeleteMessage}
        >
          Confirm
        </button>
      </div>
        </DialogContent>
    </Dialog>
    )
}
export default DeleteMessage