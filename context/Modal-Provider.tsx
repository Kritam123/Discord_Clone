"use client";
import { useEffect, useState } from "react";

import CreateChannel from "@/components/models/create-channel";
import CreateServer from "@/components/models/create-server";
import DeleteServer from "@/components/models/delete.server";
import EditServer from "@/components/models/edit-server";
import InviteModel from "@/components/models/invite-model";
import MembersModel from "@/components/models/memebers-model";
import UserModal from "@/components/models/user-model";
import DeleteChannel from "@/components/models/delete-channel";
import LeaveServer from "@/components/models/leave-server";
import EditChannel from "@/components/models/edit-channel";
import SearchChannel from "@/components/models/search-model";
import Messagefile from "@/components/models/message-file";
import DeleteMessage from "@/components/models/delete-message";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <InviteModel />
      <CreateServer />
      <UserModal />
      <MembersModel />
      <CreateChannel />
      <DeleteServer />
      <EditServer />
      <LeaveServer />
       <DeleteChannel /> 
      <EditChannel />
      <SearchChannel />
      <Messagefile />
      <DeleteMessage/>
    </>
  );
};
