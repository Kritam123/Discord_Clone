import { useSocket } from "@/context/Socket-Provider";
import { FriendRequest, User } from "@prisma/client"
import { useEffect, useState } from "react"
interface useFriendRequestProps {
    createKey:string
    updateKey:string
    deleteKey:string
}
type FriendRequestWithSenderProfile = FriendRequest & {
    sender: User;
  };
export const useFriendRequest = ({createKey,updateKey,deleteKey}:useFriendRequestProps)=>{
  const { socket } = useSocket();

    const [requestUser, setRequestUser] = useState<FriendRequest>()
    useEffect(() => {
        if (!socket) {
          return;
        }
    
        socket.on(createKey, (data: FriendRequestWithSenderProfile) => {
          setRequestUser(data);
        });
    
        socket.on(updateKey, (data: FriendRequestWithSenderProfile) => { });
    
        return () => {
          socket.off(createKey);
          socket.off(updateKey);
        };
      }, [createKey, socket, updateKey, deleteKey]);
return {requestUser}
}