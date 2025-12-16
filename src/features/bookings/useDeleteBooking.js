import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      toast.success("Booking deleted successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, mutate };
}
