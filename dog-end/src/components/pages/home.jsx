import PageHeader from "../common/pageHeader";

import Category from "./category";
import { useCookies } from "react-cookie";

import { useEffect } from "react";
import userService from "../../services/userService/userService";
const Home = () => {
 
  return (
    <div className="container" id="#home">
      <PageHeader title={<>Dogit </>} />
      <Category />
      <br />
    </div>
  );
};

export default Home;
