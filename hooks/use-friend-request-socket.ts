import { useSocket } from "@/context/Socket-Provider";
import { FriendRequest, User } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
interface useFriendRequestProps {
  createFriendKey: string;
  updateFriendKey: string;
  queryKey: string;
}
type FriendRequestWithSenderProfile = FriendRequest & {
  sender: User;
};
export const useFriendRequest = ({
  createFriendKey,
  queryKey,
  updateFriendKey,
}: useFriendRequestProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(createFriendKey, (data: FriendRequestWithSenderProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || oldData.length === 0) {
          return {
            newData: [data],
          };
        }
        const newData = [...oldData, data];
        return {
          newData,
        };
      });
    });

    socket.on(updateFriendKey, (data: FriendRequestWithSenderProfile) => {});

    return () => {
      socket.off(createFriendKey);
      socket.off(updateFriendKey);
    };
  }, [createFriendKey, socket, updateFriendKey]);
};
