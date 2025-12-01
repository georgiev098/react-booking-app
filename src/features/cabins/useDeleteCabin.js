import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabinById } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (id) => deleteCabinById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      toast.success(" Cabin deleted successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, mutate };
}
