import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "../authentication/useLogout";

function Logout() {
  const { logout, isFetching } = useLogout();

  return (
    <ButtonIcon disabled={isFetching} onClick={logout}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
