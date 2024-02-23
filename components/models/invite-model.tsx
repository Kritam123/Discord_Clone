import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-model-store";
import { toast } from "sonner";
import { useOrigin } from '@/hooks/use-origin';
import { MdOutlineLibraryAddCheck } from 'react-icons/md';
import { BiCopy } from 'react-icons/bi';
import { newInviteCode } from '@/actions/server';

const InviteModel = () => {
    const { isOpen, data, type, onOpen, onClose } = useModal();
    const { server } = data;
    const origin = useOrigin();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const isModalOpen = isOpen && type === "invite";
    const [copied, setCopied] = useState(false);
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };
    const onNew = async () => {
        try {
            setIsLoading(true);
            const response = await newInviteCode(server?.id as any); 
            onOpen("invite", { server: response as any });
            toast.success("New InviteCode...")
        } catch (error) {
            console.log(error);
            toast.error("something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mt-5 text-center text-2xl font-bold">    Invite Friends</DialogTitle>
                    <DialogDescription className="text-center  leading-4 text-gray-500 mt-3 text-sm">
                        Invite your Friend And Make An Fun With them.
                    </DialogDescription>
                </DialogHeader>
                <div className="px-3 py2 mt-8">
                    <div className="flex flex-col ">
                        <label className="text-md font-semibold" htmlFor="server">
                            Invite Link:-
                        </label>
                        <div className="flex gap-2  w-full">
                            <input
                                type="text"
                                name="server"
                                value={inviteUrl}
                                className="border-[1px] w-full border-gray-400 outline-none px-1 py-1"
                                placeholder="Server Name"
                            />
                            <button disabled={isLoading} onClick={onCopy}>
                                {copied ? (
                                    <MdOutlineLibraryAddCheck className="w-4 h-4" />
                                ) : (
                                    <BiCopy className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={onNew}
                        className="border-none active:to-blue-800 outline-none px-3 mt-5 rounded-lg text-white w-full  bg-blue-500 py-2"
                    >
                        Regenerate Code
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default InviteModel