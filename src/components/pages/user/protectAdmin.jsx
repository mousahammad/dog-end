import { Navigate } from "react-router-dom";
import usersService from "../../../services/userService/userService";

const ProtectAdmin = ({ children, admin }) => {
  const currentUser = usersService.getUser();

  if (!currentUser || (admin && !currentUser.admin)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectAdmin;
