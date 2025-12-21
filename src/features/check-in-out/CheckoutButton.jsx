import Button from "../../ui/Button";
import useCheckout from "./useCheckout";

export default function CheckoutButton({ bookingId }) {
  const { mutate, isLoading } = useCheckout();
  return (
    <Button
      onClick={() => {
        mutate(bookingId);
      }}
      disabled={isLoading}
      variation="primary"
      size="small"
    >
      Check out
    </Button>
  );
}
