"use client";
import React, { useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-model-store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UploadButton } from "@/utils/uploadthing";
import { updateServerAction } from "@/actions/server";
import { toast } from "sonner";

const EditServer = () => {
    const { isOpen, type, data, onClose } = useModal();
    const [image, setImage] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");
    const { server } = data;
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const isModalOpen = isOpen && type === "editServer";
    const serverId = server?.id;
    useEffect(() => {
        if (server) {
            setImage(server?.imgUrl);
            setName(server?.name);
        }
    }, [server]);

    const updateServerHandler = async () => {
        setIsLoading(true);
        try {
            await updateServerAction(serverId as string, name, image);
            toast.success("Server update...");
            setImage("");
            setName("");
            onClose();
        } catch (error) {
            console.log(error);
            toast.error("something went wrong!")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mt-5 text-center text-2xl font-bold">  Update Server</DialogTitle>
                    <DialogDescription className="text-center  leading-4 text-gray-500 mt-3 text-sm">
                        Update Your Server For new Look.
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
                    <button disabled={isLoading} onClick={updateServerHandler} className="border-none active:to-blue-800 outline-none px-3 mt-5 rounded-lg text-white w-full  bg-blue-500 py-2">
                        Create Server
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditServer;