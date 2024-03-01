'use server';
import { getOrCreateConversationofCurrentUser } from "@/lib/conversation"
import { revalidatePath } from "next/cache";
export const createOrGetConversationOfUser = async(conversationOneId:string,conversationTwoId:string)=>{
    const response = await getOrCreateConversationofCurrentUser(conversationOneId,conversationTwoId);
    revalidatePath("/channels/me");
    return response;
}