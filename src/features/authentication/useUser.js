import { useQuery } from "@tanstack/react-query";
import { getCurrUser } from "../../services/apiAuth";

export default function useUser() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({ queryKey: ["user"], queryFn: getCurrUser, retry: false });

  return {
    isLoading,
    user,
    error,
    isAuthenticated: user?.role === "authenticated",
  };
}
