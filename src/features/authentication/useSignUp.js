import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignUp() {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password, fullName }) => {
      return signUp({ email, password, fullName });
    },
    onSuccess: () => {
      toast.success("User created successfully. Please verify your email.");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { mutate, isLoading };
}
