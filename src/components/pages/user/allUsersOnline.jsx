import userService from "../../../services/userService/userService";
import config from "../../../config.json";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
const TOKEN_KEY = "token";

const AllUsersOnline = () => {
  const [cookies] = useCookies(["data"]);
  const [load, setLoad] = useState(true);
  const [userInfo, setUserInf] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchUsers, setSearchUsers] = useState("");

  if (!cookies.data) {
    window.location = "/login";
  }

  //get information about user from data base
  const getInfoUser = async () => {
    try {
      if (!cookies.data) {
        window.location = "/login";
      }

      setLoad(true);
      await userService.updateOnline();
      let info = await userService.getAllUsersOnline();
      setUserInf(info.data);
      setSearchUsers(info.data);
      setLoad(false);
    } catch ({ response }) {
      console.log(response.data);
    }
  };

  useEffect(() => {
    getInfoUser();
  }, []);

  if (load) {
    return <h1>אין יוזרים מחוברים בינתיים</h1>;
  }

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const displayUsers = searchUsers
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user, index) => {
      return (
        <tr key={user._id}>
          <td className="tdWidth">{index + 1 + pageNumber * usersPerPage}</td>
          <td>{user.firstName + " " + user.lastName}</td>
          <td>{user.email}</td>
          <td>
            <img
              height="50px"
              width="50px"
              src={
                user.image
                  ? `${config.pictureUrl}${user._id}.jpg`
                  : config.defaultImage
              }
              className="mb-4"
              alt="profile photo"
            />
          </td>

          <td>
            <button
              type="button"
              className=" buttonWhatsapp "
              onClick={() =>
                (window.location = `https:api.whatsapp.com/send?phone=${user.phone}`)
              }
            >
              צור קשר
            </button>
          </td>
        </tr>
      );
    });
  const pageCount = Math.ceil(searchUsers.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleChange = (e) => {
    let temp = e.target.value.trim();
    const userFilter = userInfo.filter((user) => {
      return (
        user.firstName.toLowerCase().includes(temp.toLowerCase()) ||
        user.email.includes(temp.toLowerCase())
      );
    });

    setSearchUsers(userFilter);
  };

  return (
    <>
      {userInfo.length ? (
        <>
          {" "}
          {pageNumber === 0 && (
            <div className="d-flex flex-column">
              <label>:חיפוש לפי שם או מייל</label>

              <input
                placeholder="הב הב אני מחכה לך..."
                onChange={handleChange}
                className=""
              />
            </div>
          )}
          <table className="table">
            <thead>
              <tr>
                <th>מספר</th>
                <th>שם</th>
                <th>מייל</th>
                <th>תמונה פרופיל</th>
                <th>צאט</th>
              </tr>
            </thead>
            <tbody>{displayUsers}</tbody>
          </table>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </>
      ) : (
        <h1 className="text-danger">No users yet</h1>
      )}
    </>
  );
};

export default AllUsersOnline;
