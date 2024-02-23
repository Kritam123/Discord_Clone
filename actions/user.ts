'use server'

import { getUserByUserName } from "@/lib/getUserByUsername";
import { UpdateUserApi } from "@/lib/user";
import { revalidatePath } from "next/cache";

export const updateUserAction = async(image:string,username:string,displayName:string)=>{
    const response = await UpdateUserApi(image,username,displayName);
    revalidatePath(`/channels/me`);
    return response;
}
export const getUserByUserNameAction = async(username:string)=>{
    const response = await getUserByUserName(username);
    revalidatePath(`/channels/me`);
    return response;
}