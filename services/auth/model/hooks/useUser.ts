import { useQuery } from "@tanstack/react-query";
import { User } from "../types";
import { fetchMeFn } from "../api/mutations"; // Adjust path if you saved it elsewhere

export const useUser = () => {
  return useQuery<User | null>({
    // Unique key for caching user data
    queryKey: ["current-user"],

    // The function that calls your /auth/me endpoint
    queryFn: fetchMeFn,

    // Do not retry on failure (if 401, we want to know immediately)
    retry: false,

    // Time in milliseconds before the data is considered "stale".
    // 5 minutes is a good balance; keeps the UI fast without hammering the server.
    staleTime: 5 * 60 * 1000,
  });
};
