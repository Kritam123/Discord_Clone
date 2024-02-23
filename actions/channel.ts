"use server";
import { ChannelCreateApi, ChannelDeleteApi,ChannelUpdateApi } from "@/lib/channel";
import { revalidatePath } from "next/cache";

export const createChannel = async (
  name: string,
  selected: string,
  serverId: string
) => {
  await ChannelCreateApi(serverId, name, selected);
  revalidatePath(`/channels/${serverId}`);
};
export const deleteChannelAction = async (
  serverId: string,
  channelId: string
) => {
  const response =  await ChannelDeleteApi(serverId, channelId);
  revalidatePath(`/channels/${serverId}`);
  return response;
};
export const updateChannelAction = async (
  serverId: string,
  channelId: string,
  name:string,
  selected:string
) => {
  const response =  await ChannelUpdateApi(serverId, channelId,name,selected);
  revalidatePath(`/channels/${serverId}`);
  return response;
};
