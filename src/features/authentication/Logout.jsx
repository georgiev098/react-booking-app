import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { ButtonIcon } from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import { SpinnerMini } from "../../ui/SpinnerMini";

export default function Logout() {
  const { mutate, isLoading } = useLogout();
  function handleLogout() {
    mutate();
  }
  return (
    <ButtonIcon disabled={isLoading} onClick={handleLogout}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}
