import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAndEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading } = useMutation({
    mutationFn: (newCabinData) => createAndEditCabin(newCabinData),
    onSuccess: () => {
      toast.success("New cabin created successfully.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isLoading, createCabin };
}
