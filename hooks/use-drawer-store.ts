import { create } from "zustand";
export type drawerType = | "openProfileDrawer" | "openFriendsDrawer" | "openServerDrawer"


interface DrawerStore {
  type: drawerType | null
  isOpen: boolean;
  onOpen: (type:drawerType | null) => void;
  onClose: () => void;
}

export const useDrawer= create<DrawerStore>((set) => ({
  type:null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true,type }),
  onClose: () => set({ isOpen: false,type:null }),
}));
