import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Channel,
  ChannelType,
  Member,
  Message,
  Server,
  User,
} from "@prisma/client";
import { useSocket } from "@/context/Socket-Provider";
type ServerWithChannelProps = Server & {
  channels: Channel[];
};

type ChannelSocketProps = {
  channelKey: string;
  channelupdatekey:string
};



export const useChannelSocket = ({
  channelKey,
}: ChannelSocketProps) => {
  const { socket } = useSocket();
  const [audioChannels, setAudioChannels] = useState<any>();
  const [textChannels, setTextChannels] = useState<any>();
  const [videoChannels, setVideoChannels] = useState<any>();

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(channelKey, (server: ServerWithChannelProps) => {
      console.log(server);
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
    });
    return () => {
      socket.off(channelKey);
    };
  }, [channelKey, socket]);
  return { audioChannels, textChannels, videoChannels };
};
