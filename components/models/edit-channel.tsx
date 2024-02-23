'use client'
import React,{useEffect} from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-model-store";
import { toast } from "sonner";
import CreateChannelDropDown from '../CreateChannelDropDown';
import { updateChannelAction } from '@/actions/channel';
const EditChannel = () => {
  const { isOpen, type, onClose,data } = useModal();
  const [name, setName] = React.useState<string>("");
  const [selected, setSelected] = React.useState("TEXT");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const isModalOpen = isOpen && type === "editChannel";
 const {server,channel} = data;
 const serverId = server?.id;
 const channelId = channel?.id;
  const handleEditChannel = async () => {
    setIsLoading(true);
    try { 
      await updateChannelAction(serverId as any ,channelId as string ,name, selected );
      toast.success("Channel Updated...");
      setName("");
      setSelected("");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!")
    } finally {
      setIsLoading(false);
    }

  }
  useEffect(() => {
    if (channel) {
    setName( channel.name);
     setSelected(channel?.type as any);
    }
   }, [ channel]);
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mt-5 text-center text-2xl font-bold">   Edit a Channel</DialogTitle>
          <DialogDescription className="text-center  leading-4 text-gray-500 mt-3 text-sm">
          Edit Channel is ${channel?.name}. Make Your and
              start talking.
          </DialogDescription>
        </DialogHeader>
        <div className="px-3 py2 mt-8">
          {/* server name */}
          <div className="flex flex-col ">
            <label className="text-md font-semibold" htmlFor="server">
              Channel Name:-
            </label>
            <input
              type="text"
              name="server"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-[1px] border-gray-400 outline-none mb-4 px-1 py-1 "
              placeholder="Channel Name"
            />
          </div>
          <label className="text-md font-semibold" htmlFor="server">
            Channel Type:-
          </label>
          <CreateChannelDropDown
            selected={selected}
            setSelected={setSelected}
          />
          <button
            disabled={isLoading}
            onClick={handleEditChannel}
            className="border-none active:to-blue-800 cursor-pointer outline-none px-3 mt-5 rounded-lg text-white w-full  bg-blue-500 py-2"
          >
            Edit Channel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditChannel