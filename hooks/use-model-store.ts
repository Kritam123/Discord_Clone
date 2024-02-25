import { Channel, ChannelType, Server, User } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createServer"
  | "invite"
  | "updateUser"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel"
  | "messageFile"
  |  "server"
  |  "searchannel"
  | "deleteMessage";
  type ServerSearchProps =  {
      label: string;
      type: "channel" | "member",
      data: {
        icon: React.ReactNode;
        name: string;
        id: string;
      }[] | undefined
    }[]
  

interface ModalData {
  server?: Server 
  channel?: Channel;
  user?:User;
  searchProps?:ServerSearchProps
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
  socketUrl?:string
  socketQuery?:Record<string, any>;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
