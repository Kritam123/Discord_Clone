import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FriendRequest, User } from "@prisma/client";
import axios from "axios";
import qs from "query-string";
import React from "react";
import { toast } from "sonner";
interface FriendRequestWithSender {
  request: FriendRequest & {
    sender: User;
  };
}

const PendingUserBox = ({ request }: FriendRequestWithSender) => {
  let socketUrl = "/api/socket/friend-request";
  let id = request.id;
  const handleDeleteRequest = async () => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: {
          requestId: request.id,
        },
      });
      await axios.delete(url);
      toast.success("Delete Request....");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };
  const handleConfirmRequest = async () => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: {
          requestId: request.id,
          senderId: request.senderId,
          reciverId: request.reciverId,
        },
      });
      await axios.patch(url);
      toast.success(`Comfirm Request ${request.sender.username}`);
      handleDeleteRequest();
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <div className="flex cursor-pointer hover:bg-[#f2f2f2] dark:hover:bg-[#404249] rounded-md justify-between group py-2 px-2 items-center">
      <div className="flex gap-2">
        <div className="relative">
          <Avatar>
            <AvatarImage src={request.sender.image as string} />
            <AvatarFallback>img</AvatarFallback>
          </Avatar>
          <div className={cn("absolute bottom-1 right-1 rounded-md w-3 h-3 bg-white ",request.sender.status === "Online" && "bg-[#56ab47]")} />
        </div>
        <div className="flex justify-center flex-col">
          <span className="dark:text-white text-gray-700 font-semibold">
            {request.sender?.username}
          </span>
          <span className="dark:text-gray-400 text-gray-500 text-sm">
            {request.sender?.status}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={handleConfirmRequest}
          className="capitalize bg-blue-700 text-white hover:bg-blue-500 hover:text-white"
          variant={"outline"}
        >
          Confirm Request
        </Button>
        <Button
          onClick={handleDeleteRequest}
          className="capitalize text-blue-500"
          variant={"outline"}
        >
          Delete Request
        </Button>
      </div>
    </div>
  );
};

export default PendingUserBox;
