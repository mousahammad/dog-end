import React, { useEffect } from "react";
import userService from "../../services/userService/userService";

function Logout() {
  useEffect(() => {
    userService.logout();
    window.location = "/";
  }, []);

  return null;
}

export default Logout;
