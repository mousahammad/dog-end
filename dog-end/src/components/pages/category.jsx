import React from "react";

import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const Category = () => {
  const [cookies, setCookie] = useCookies(["data"]);

  return (
    <div className="row center">
      {/* dogwalker cards */}
      {cookies.data && (
        <>
          <div className="col-lg-4">
            <h5 className="center">מאלפים</h5>
            <Link to="/dogtrainer">
              <img
                className="d-block w-100 mt-3 category_border "
                src="https://cdn.pixabay.com/photo/2015/03/07/03/57/dog-school-662761_960_720.jpg"
                // src="https://source.unsplash.com/random/640x480?dogtrainer"
                alt="dog trainer"
              />
            </Link>
          </div>
          {/*  dogtrainer cards */}
          <div className="col-lg-4">
            <h5 className="center ">דוגווקר</h5>
            <Link to="/dogwalker">
              <img
                className="d-block w-100 mt-3 category_border"
                src="https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="dog walker with a leash"
              />
            </Link>
          </div>
        </>
      )}

      {/*  article cards */}

      <div className="col-lg-4">
        <h5 className="center ">מאמרים</h5>
        <Link to="/article">
          <img
            className="d-block w-100 mt-3 category_border"
            src="https://images.pexels.com/photos/1485637/pexels-photo-1485637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="articles"
          />
        </Link>
      </div>
    </div>
  );
};

export default Category;
