'use server';

import { kickMemberApi,roleChangeMemberApi } from "@/lib/server";
import { revalidatePath } from "next/cache";

export const onKickAction = async(serverId:string,memberId:string)=>{
   const response = await kickMemberApi(serverId,memberId);
   revalidatePath(`/servers/${serverId}`);
   return response;
}
export const roleChangeAction = async(serverId:string,memberId:string,role:string)=>{
   const response = await roleChangeMemberApi(serverId,memberId,role);
   revalidatePath(`/servers/${serverId}`);
   return response;
}