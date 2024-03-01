import qs from "query-string";
import { useQuery } from "@tanstack/react-query";
import { useSocket } from "@/context/Socket-Provider";
import axios from "axios";

interface allfriendsQueryProps {
  queryKey: string;
  apiUrl: string;
}

export const useAllFriendsQuery = ({
  queryKey,
  apiUrl,
}: allfriendsQueryProps) => {
  const { isConnected } = useSocket();
  const fetchAllFriends = async () => {
    const url = qs.stringifyUrl({
      url: apiUrl,
    });
    const { data } = await axios.get(url);
    return data;
  };
  const { data, status, error, isError, isLoading, refetch } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchAllFriends,
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
