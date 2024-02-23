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
import { redirect, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UploadButton } from "@/utils/uploadthing";
import { createServer } from "@/actions/server";
import { toast } from "sonner";
const CreateServer = () => {
    const { isOpen, type, onClose } = useModal();
    const router =  useRouter()
    const [image, setImage] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const isModalOpen = isOpen && type === "server";
    const handleCreateServer = async()=>{
        setIsLoading(true);
        try {
           const serverId =  await createServer(name,image);
            toast.success("Server Created...");
            setImage("");
            setName("");
            onClose();
            router.push(`/servers/${serverId}`);
        } catch (error) {
            console.log(error);
            toast.error("something went wrong!")
        }finally {
            setIsLoading(false)
        }
       
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mt-5 text-center text-2xl font-bold"> Create a Server</DialogTitle>
                    <DialogDescription className="text-center  leading-4 text-gray-500 mt-3 text-sm">
                        Your server is where you and your friends hangout. Make Your and
                        start talking.
                    </DialogDescription>
                </DialogHeader>
                <div className="px-3 py2 mt-8">
                    {image ?
                        <div className="w-full relative flex justify-center">
                            <Avatar>
                                <AvatarImage src={image} />
                                <AvatarFallback>{"CN"}</AvatarFallback>
                            </Avatar>
                        </div>
                        :
                        <UploadButton
                            endpoint="serverImage"
                            onClientUploadComplete={(res) => {
                                setImage(res[0].url);
                            }}
                            onUploadError={(error: Error) => {
                                alert(`ERROR! ${error.message}`);
                            }}
                        />
                    }
                    {/* server name */}
                    <div className="flex flex-col ">
                        <label className="text-md font-semibold" htmlFor="server">
                            Server Name:-
                        </label>
                        <input
                            type="text"
                            name="server"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-[1px] border-gray-400 outline-none px-1 py-1"
                            placeholder="Server Name"
                        />
                    </div>
                    <button disabled={isLoading} onClick={handleCreateServer} className="border-none active:to-blue-800 outline-none px-3 mt-5 rounded-lg text-white w-full  bg-blue-500 py-2">
                        Create Server
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateServer;
