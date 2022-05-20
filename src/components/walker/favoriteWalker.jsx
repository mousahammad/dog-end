// import SearchBar from "../searchBar";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import TemplateCardWalker from "./templateCardWalker";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import userService from "../../services/userService/userService";
import cardService from "../../services/dogWalker/cardServiceDogWalker";

const FavoriteWalker = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  //get all favorite walkers
  const getAllWalkers = async () => {
    try {
      let myCards = [];
      setLoading(true);
      myCards = await cardService.getAllFavoriteWalker();
      setCards(myCards.data);

      setLoading(false);
    } catch ({ response }) {
      // ToastContainer
      toast.error("לא התחברת לא יהיה תוכן! 😯 " + response.data, {
        position: "top-center",
        autoClose: 5000,
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
    return <h1>Loading...</h1>;
  }

  //number pages in current page
  const cardsPerPage = 3;
  //total number of pages
  const pagesVisited = pageNumber * cardsPerPage;

  //display cards
  const displayCards = cards
    .slice(pagesVisited, pagesVisited + cardsPerPage)
    .map((card) => {
      return (
        <TemplateCardWalker
          key={card.card._id}
          card={card}
          setUpdatePage={true}
        />
      );
    });

  const pageCount = Math.ceil(cards.length / cardsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      {cards.length ? (
        <div className="container mt-5">
          <h1 className="text-primary mb-3">favorite card walker</h1>
          {displayCards}
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
      ) : (
        <h1 className="text-danger">עדיין לא סימנת מועדפים.. 🤷‍♂️</h1>
      )}
    </>
  );
};

export default FavoriteWalker;
