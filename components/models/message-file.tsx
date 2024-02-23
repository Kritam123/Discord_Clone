import React from 'react'
import qs from "query-string";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { UploadButton } from '@/utils/uploadthing';
import { useModal } from '@/hooks/use-model-store';
import axios from 'axios';
const MessageFile = () => {
    const { isOpen, onClose, type, data } = useModal();
    const {apiUrl,query} = data
    const isModalOpen = isOpen && type === "messageFile";
    const [fileUrl, setFileUrl] = React.useState<string | null>("");
    const handleSendFile = async() => {
            try {
              const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
              });
        
              await axios.post(url, {
                value : null,
                fileUrl:fileUrl
              });    
              onClose();
              setFileUrl("");
            } catch (error) {
              console.log(error);
            }
          
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mt-5 text-center text-2xl font-bold">  Add an attachment</DialogTitle>
                    <DialogDescription className="text-center  leading-4 text-gray-500 mt-3 text-sm">
                        Send a file as a message
                    </DialogDescription>
                </DialogHeader>
                <div className="px-3 py2 mt-8">
                    <UploadButton
                        endpoint="messageFile"
                        onClientUploadComplete={(res) => {
                            setFileUrl(res[0].url);
                        }}
                        onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                        }}
                    />
                    <button onClick={handleSendFile} className="px-2 py-2 mt-2   text-center w-full text-white bg-blue-600 rounded-md">
                        send
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MessageFile