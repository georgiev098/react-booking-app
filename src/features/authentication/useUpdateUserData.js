import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useUpdateUserData() {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: ({ password, fullName, avatar }) => {
      return updateUser({ password, fullName, avatar });
    },
    onSuccess: ({ user }) => {
      toast.success(" User updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, mutate };
}
