import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Channel, ChannelType, Member, Server, User } from "@prisma/client";
import { useSocket } from "@/context/Socket-Provider";
type ServerWithChannelWithMemberWithProfileProps = Server & {
  channels: Channel[];
  members: Member[];
  profile: User;
};

type ChannelSocketProps = {
  channelKey: string;
  channelupdatekey: string;
  profileId: string;
};

export const useChannelSocket = ({
  channelKey,
  profileId,
}: ChannelSocketProps) => {
  const { socket } = useSocket();
  const [audioChannels, setAudioChannels] = useState<any>();
  const [textChannels, setTextChannels] = useState<any>();
  const [videoChannels, setVideoChannels] = useState<any>();
  const [members, setMembers] = useState<any>();

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(
      channelKey,
      (server: ServerWithChannelWithMemberWithProfileProps) => {
        const textChannels = server?.channels?.filter(
          (channel) => channel.type === ChannelType.TEXT
        );
        setTextChannels(textChannels);
        const audioChannels = server?.channels?.filter(
          (channel) => channel.type === ChannelType.AUDIO
        );
        setAudioChannels(audioChannels);
        const videoChannels = server?.channels?.filter(
          (channel) => channel.type === ChannelType.VIDEO
        );
        setVideoChannels(videoChannels);
        const members = server?.members.filter(
          (member) => member.userId !== profileId
        );
        setMembers(members);
      }
    );
    return () => {
      socket.off(channelKey);
    };
  }, [channelKey, socket]);
  return { audioChannels, textChannels, videoChannels, members };
};
