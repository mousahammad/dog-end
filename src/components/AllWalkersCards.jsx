import SearchBar from "../components/searchBar";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import TemplateCardWalker from "./walker/templateCardWalker";
import React, { useState, useEffect } from "react";
import walkerService from "../services/dogWalker/cardServiceDogWalker";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import userService from "../services/userService/userService";

const AllWalkersCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  //get inforamtion about user's cuurent card
  const getUserInf = async (user_id) => {
    try {
      let user = "";

      user = await userService.getInfoUserById(user_id);

      return user.data;
    } catch (err) {}
  };

  const getAllWalkers = async () => {
    try {
      let cards = [];
      setLoading(true);
      let walker = await walkerService.getAllCards();

      for (let i = 0; i < walker.data.length; i++) {
        let user = await getUserInf(walker.data[i].user_id);
      
        cards.push({ card: walker.data[i], user: user[0] });
      }

      setCards(cards);

      setLoading(false);
    } catch ({ response }) {
      // ToastContainer
      toast.error("לא התחברת לא יהיה תוכן! 😯", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(response);
      
    }
  };

  useEffect(() => {
    getAllWalkers();
  }, []);

  if (loading) {
    return <h1>הב הב מחפש את העצם...</h1>;
  }

  const cardsPerPage = 6;
  const pagesVisited = pageNumber * cardsPerPage;
  const displayCards = cards
    .slice(pagesVisited, pagesVisited + cardsPerPage)
    .map((card) => {
      return <TemplateCardWalker key={card.card._id} card={card} />;
    });
  const pageCount = Math.ceil(cards.length / cardsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">דוגווקרים</h1>
      {displayCards}
      <br />
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
    </div>
  );
};

export default AllWalkersCards;
