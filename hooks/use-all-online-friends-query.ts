import qs from "query-string";
import { useQuery } from "@tanstack/react-query";
import { useSocket } from "@/context/Socket-Provider";
import axios from "axios";

interface allOnlinefriendsQueryProps {
  queryKey: string;
  apiUrl: string;
}

export const useAllOnlineFriendsQuery = ({
  queryKey,
  apiUrl,
}: allOnlinefriendsQueryProps) => {
  const { isConnected } = useSocket();
  const fetchAllOnlineFriends = async () => {
    const url = qs.stringifyUrl({
      url: apiUrl,
    });
    const { data } = await axios.get(url);
    return data;
  };
  const { data, status, error, isError, isLoading, refetch } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchAllOnlineFriends,
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
