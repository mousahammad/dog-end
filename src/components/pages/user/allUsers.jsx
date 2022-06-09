import userService from "../../../services/userService/userService";
import config from "../../../config.json";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
const TOKEN_KEY = "token";

const AllUsers = () => {
  const [cookies, setCookie] = useCookies(["data"]);
  const [load, setLoad] = useState(true);
  const [userInfo, setUserInf] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchUsers, setSearchUsers] = useState("");

  if (!cookies.data || !cookies.data.admin) {
    window.location = "/login";
  }

  //get information about user from data base
  const getInfoUser = async () => {
    try {
      if (!cookies.data.admin) {
        window.location = "/login";
      }

      setLoad(true);
      let info = await userService.getAllUsers();
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
    return <h1>טעון תוכן ...</h1>;
  }
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const displayUsers = searchUsers
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user, index) => {
      return (
        <tr key={user.user._id}>
          <td className="tdWidth">{index + 1 + pageNumber * usersPerPage}</td>
          <td>{user.user.firstName + " " + user.user.lastName}</td>
          <td>{user.user.email}</td>
          <td>
            <img
              height="50px"
              width="50px"
              src={
                user.user.image
                  ? `${config.pictureUrl}${user.user._id}.jpg`
                  : config.defaultImage
              }
              className="mb-4"
              alt="profile photo"
            />
          </td>
          <td>{user.user.dogWalker ? "מקצוע דווג ווקר" : "אינו דוג ווקר"}</td>
          <td>{user.user.dogTrainer ? "מקצוע דוג טרינר" : "אינו דוג טרינר"}</td>
          <td>
            <Link
              className="btn btn-success"
              to={`/editUser/${user.user._id}/allUsers`}
            >
              <i className="bi bi-pen"></i>עריכה
            </Link>
          </td>
          <td>
            {user.cardWalker ? (
              <>
                <Link
                  className="btn btn-primary"
                  to={`/editCardWalker/${user.cardWalker._id}/allUsers`}
                >
                  <i className="bi bi-pen"></i>
                </Link>
                <Link
                  className="btn btn-primary"
                  to={`/deleteCardWalker/${user.cardWalker._id}/allUsers`}
                >
                  מחיקה
                </Link>
              </>
            ) : (
              "אין כרטיס מסוג דוג ווקר"
            )}
          </td>
          <td>
            {user.cardTrainer ? (
              <>
                <Link
                  className="btn btn-primary"
                  to={`/editCardTrainer/${user.cardTrainer._id}/allUsers`}
                >
                  <i className="bi bi-pen"></i>
                </Link>
                <Link
                  className="btn btn-primary"
                  to={`/deleteCardTrainer/${user.cardTrainer._id}/allUsers`}
                >
                  מחיקה
                </Link>
              </>
            ) : (
              "אין כרטיס מסוג דוג טרינר"
            )}
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
        user.user.firstName.toLowerCase().includes(temp.toLowerCase()) ||
        user.user.email.includes(temp.toLowerCase())
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

                <th> מקצוע דוג ווקר</th>
                <th> מקצוע דוג טרינר</th>
                <th>עריכת נתוני יוזר</th>
                <th>עריכת כרטיס דוג ווקר</th>
                <th>עריכת כרטיס דוג טרינר</th>
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

export default AllUsers;
