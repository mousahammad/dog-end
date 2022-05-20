import React, { useEffect } from "react";
import Navbar from "./navbar";
import Cookies from "universal-cookie";

import userService from "../services/userService/userService";

function Navigation() {
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default Navigation;
