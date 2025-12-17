import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      login({ email, password });
    },
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user);
      navigate("/");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Incorrect credentials.");
    },
  });

  return { mutate, isLoading };
}
