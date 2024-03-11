import React, { useEffect } from 'react'
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
import { toast } from "sonner";
import { AiOutlineClose } from 'react-icons/ai';
import { updateUserAction } from '@/actions/user';
const UserModal = () => {
    const { isOpen, type, data, onClose } = useModal();
    const [image, setImage] = React.useState<string>("");
    const { user } = data;
    const [displayName, setDisplayName] = React.useState<string>("");
    const [username, setUsername] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const isModalOpen = isOpen && type === "updateUser";
    const handleUserUpdate = async () => {
        try {
            setIsLoading(true);
            const response = await updateUserAction(image, username, displayName);

            response && toast.success("User updated...");
            onClose();
            setImage("");
            setUsername("");
            setDisplayName("");
        } catch (error) {
            toast.error("Something went wrong!");
            console.log("Upload server", error);
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if (user) {
            setUsername(user?.username as string);
            setDisplayName(user?.displayName as string);
            setImage(user?.image as string);
        }
    }, [user]);
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mt-5 text-center text-2xl font-bold">Update Profile Image</DialogTitle>

                    <DialogDescription className="text-center  leading-4 text-gray-500 mt-3 text-sm">
                        Update Your Profile Picture For new Look.
                    </DialogDescription>
                </DialogHeader>
                <div className="px-3 py2 mt-8">
                    {image ? (
                        <div className="w-full  flex justify-center">
                            <div className="relative">
                                <button
                                    onClick={() => setImage("")}
                                    className="absolute right-0 top-0"
                                >
                                    <AiOutlineClose className="w-5 h-5 absolute top-0 left-0  cursor-pointer hover:text-black  text-gray-500 " />
                                </button>
                                <button>
                                    <Avatar>
                                        <AvatarImage src={image} />
                                        <AvatarFallback>{"CN"}</AvatarFallback>
                                    </Avatar>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <UploadButton
                            endpoint="profileImage"
                            onClientUploadComplete={(res) => {
                                setImage(res[0]?.url);
                            }}
                            onUploadError={(error: Error) => {
                                alert(`ERROR! ${error.message}`);
                            }}
                        />
                    )}
                    {/* server name */}
                    <div className="flex flex-col ">
                        <label className="text-md font-semibold" htmlFor="server">
                            DisplayName:-
                        </label>
                        <input
                            type="text"
                            name="server"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="border-[1px] border-gray-400 outline-none px-1 py-1"
                            placeholder="DisplayName"
                        />
                    </div>
                    <div className="flex flex-col ">
                        <label className="text-md font-semibold" htmlFor="server">
                            UserName:-
                        </label>
                        <input
                            type="text"
                            name="server"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border-[1px] border-gray-400 outline-none px-1 py-1"
                            placeholder="UserName"
                        />
                    </div>
                    <button
                        disabled={isLoading}
                        onClick={handleUserUpdate}
                        className="border-none active:to-blue-800 outline-none px-3 mt-5 rounded-lg text-white w-full  bg-blue-500 py-2"
                    >
                        Update
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserModal