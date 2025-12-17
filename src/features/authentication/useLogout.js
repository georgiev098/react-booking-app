import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Successfully logged out.");
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
    onError: (err) => {
      toast.error(err);
      console.error(err);
    },
  });

  return { mutate, isLoading };
}
