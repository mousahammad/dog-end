import React, { useEffect } from "react";
import userService from "../../../services/userService/userService";

const updateStatus = async () => {
  try {
    await userService.updateOffline();
  } catch ({ response }) {}
};

function Logout() {
  useEffect(() => {
    userService.logout();
    updateStatus();
    window.location = "/";
  }, []);

  return null;
}

export default Logout;
