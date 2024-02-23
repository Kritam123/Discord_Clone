'use server'
import { ServerCreate, deleteServerApi, leaveServerApi,newInviteCodeApi, updateServerApi } from "@/lib/server";
import { revalidatePath } from "next/cache"

export const createServer = async(name:string,image:string)=>{
    const result = await ServerCreate(name,image);
    revalidatePath("/channels/me");
    return result;
}
export const updateServerAction = async(serverId:string,name:string,image:string)=>{
    const result = await updateServerApi(serverId,name,image);
    revalidatePath(`/channels/${serverId}`);
    return result;
}

export const newInviteCode = async (serverId:string) => {
    const response = await newInviteCodeApi(serverId);
    revalidatePath(`/channels/${serverId}`);
    return response;
}
export const deleteServerAction = async (serverId:string) => {
    const response = await deleteServerApi(serverId);
    revalidatePath(`/channels/${serverId}`);
    revalidatePath(`/channels/me`);
    return response;
}
export const leaveServerAction = async (serverId:string) => {
    const response = await leaveServerApi(serverId);
    revalidatePath(`/channels/${serverId}`);
    revalidatePath(`/channels/me`);
    return response;
}
