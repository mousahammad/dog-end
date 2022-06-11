import { Container } from "react-bootstrap";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const AllCards = ({
  Comp,
  cards,
  setUpdatePage,
  loading,
  numberPage,
  Message,
  NameCards,
}) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [searchCards, setSearchCards] = useState(cards);

  if (loading) {
    return <h1>הב הב מחכה לתוכן...</h1>;
  }

  const cardsPerPage = numberPage;
  const pagesVisited = pageNumber * cardsPerPage;
  const displayCards = searchCards
    .slice(pagesVisited, pagesVisited + cardsPerPage)
    .map((card) => {
      return (
        <div key={card.card._id} className="col-12 col-md-6 mb-4">
          <Comp key={card.card._id} card={card} setUpdatePage={setUpdatePage} />
        </div>
      );
    });
  const pageCount = Math.ceil(searchCards.length / cardsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleChange = (e) => {
    let temp = e.target.value.trim();
    const cardsFiltered = cards.filter((card) => {
      return card.user.firstName.toLowerCase().includes(temp.toLowerCase());
    });

    setSearchCards(cardsFiltered);
  };

  return (
    <>
      {cards.length ? (
        <div className="container mt-1">
          <h1 className="textStyle mb-3">{NameCards}</h1>
          <br />
          {pageNumber === 0 && (
            <div className="mb-4 row d-flex justify-content-center ">
              <label className=" d-flex justify-content-center">חיפוש בעל מקצוע לפי שם:</label>
              <br />
              <input
                placeholder="חפש/י פה ...🔍"
                onChange={handleChange}
                className="searchInput"
              />
            </div>
          )}
          <div className="row">{displayCards}</div>

          <div className="mt-5 text-center">
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
        </div>
      ) : (
        <h1 className="text-danger">{Message}</h1>
      )}
    </>
  );
};

export default AllCards;
