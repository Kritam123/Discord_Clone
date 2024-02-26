import qs from "query-string";
import { useQuery } from "@tanstack/react-query";
import { useSocket } from "@/context/Socket-Provider";
import axios from "axios";

interface ChannelQueryProps {
  queryKey: string;
  apiUrl: string;
  serverId: any;
}

export const useChannelsQuery = ({
  queryKey,
  apiUrl,
  serverId,
}: ChannelQueryProps) => {
  const { isConnected } = useSocket();
  const fetchChannels = async () => {
    const url = qs.stringifyUrl({
      url: apiUrl,
      query: {
        serverId: serverId,
      },
    });
    const { data } = await axios.get(url);
    return data;
  };
  const { data, status, error, isError, isLoading, refetch } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchChannels,
    refetchInterval: isConnected ? false : 1000,
  });

  return {
    data,
    status,
    error,
    isError,
    isLoading,
    refetch,
  };
};
