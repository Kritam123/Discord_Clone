'use client'
import React from 'react'
import qs from "query-string";
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
import { createChannel } from '@/actions/channel';
import axios from 'axios';
const CreateChannel = () => {
  const { isOpen, type, onClose,data } = useModal();
  const {server,socketUrl,socketQuery} = data;
  const [name, setName] = React.useState<string>("");
  const [selected, setSelected] = React.useState("TEXT");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const isModalOpen = isOpen && type === "createChannel";
  let serverId = server?.id
  const handleCreateChannel = async () => {
    setIsLoading(true);
    try {
      const url = qs.stringifyUrl({
        url: socketUrl || "",
        query:socketQuery,
      });
      await axios.post(url,{name,type:selected});
      // await createChannel(name, selected, serverId as any);
      toast.success("Channel Created...");
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
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mt-5 text-center text-2xl font-bold">  Create a Channel</DialogTitle>
          <DialogDescription className="text-center  leading-4 text-gray-500 mt-3 text-sm">
            Your channel is where you and your friends hangout. Make Your and
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
            onClick={handleCreateChannel}
            className="border-none active:to-blue-800 outline-none px-3 mt-5 rounded-lg text-white w-full  bg-blue-500 py-2"
          >
            Create Channel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateChannel