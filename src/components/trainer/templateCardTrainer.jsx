import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import userService from "../../services/userService/userService";
import trainerService from "../../services/dogTrainer/cardServiceDogTrainer";
import { useCookies } from "react-cookie";
import config from "../../config.json";
import { BsHeart } from "react-icons/bs";
import { BsFillSuitHeartFill } from "react-icons/bs";

//card: contain details about cardWalker
//setUpdatePage:update favorite page when delete it from favorite
const TemplateCardTrainer = ({ card, setUpdatePage }) => {
  const [cookies, setCookie] = useCookies(["data"]);
  const [load, setLoad] = useState({});

  //variable its contains true if the card in the favorite
  const [cardFv, setCardFv] = useState(null);

  // check if current card exists in the current user.
  const checkExistFavoriteCard = async () => {
    try {
      setLoad(true);
      // להוסיף לשירותים  - את הפונקציות
      let flag = await trainerService.checkFavoriteCard(card.card._id);

      setCardFv(flag);
      setLoad(false);
    } catch (err) {}
  };

  //add  curent card on the favorite
  const addFavoriteCard = async () => {
    try {
      if (!card) {
        return;
      }

      let user = await trainerService.addFavoriteCard({
        fDogTrainer: [card.card._id],
      });

      setCardFv({ data: true });
    } catch ({ response }) {
      console.log(response.data);
    }
  };

  const deleteFavoriteCard = async () => {
    try {
      if (!card) {
        return;
      }

      console.log(card.card._id);
      await trainerService.deleteFavoriteCard({
        fDogTrainer: [card.card._id],
      });

      setCardFv({ data: false });
      if (setUpdatePage) {
        window.location = "/favoriteTrainer";
      }
    } catch ({ response }) {
      console.log(response.data);
    }
  };

  useEffect(() => {
    checkExistFavoriteCard();
  }, []);

  if (load) {
    return <h1>הב הב מחכה לעצם ...</h1>;
  }

  return (
    <>
      <div className="borderStyle">
        {/* buttons */}
        <div className="row ">
          <div className="col-4 justify-content-center">
            {/* delete */}
            {card && card.card.user_id === cookies.data._id && (
              <Link
                className="ml-1 "
                to={`/deleteCardTrainer/${card.card._id}/profile`}
              >
                <button type="button" className="btnDelete ">
                  <i className="bi bi-trash"></i>
                </button>
              </Link>
            )}

            {/* edit button */}
            {card && card.card.user_id === cookies.data._id && (
              <Link to={`/editCardTrainer/${card.card._id}/profile`}>
                <b>
                  <button type="button" className="btnEdit m-1">
                    <i className="bi bi-pen"></i>
                  </button>
                </b>
              </Link>
            )}
          </div>
          <div className="col-4 text-center mb-3">
            {/* profile image of the profile */}
            <img
              className="zoomOut"
              src={
                card.user.image
                  ? `${config.pictureUrl}${card.user._id}.jpg`
                  : config.defaultImage
              }
            />
          </div>
          <div className="col-4 text-center">
            {/* favorite buttons */}
            {cardFv &&
              !cardFv.data &&
              card &&
              card.card.user_id !== cookies.data._id && (
                <button
                  type="button"
                  className="Favorite_btn"
                  onClick={addFavoriteCard}
                >
                  <BsHeart />
                </button>
              )}

            {cardFv && cardFv.data && card.card.user_id !== cookies.data._id && (
              <button
                type="button"
                className="FavoriteDele_btn"
                onClick={deleteFavoriteCard}
              >
                 <BsFillSuitHeartFill />
              </button>
            )}
          </div>
        </div>
        {/* card profile info */}
        <div className="row justify-content-center">
          <div className="col-12 text-center borderStyleColor">
            <h2>{card.user.firstName}</h2>
            <h5> {`עלות : ${card.card.cost} ₪`} </h5>
            <h5> {`טלפון : ${card.user.phone}`}</h5>
            <h5> {`אימייל : ${card.user.email}`}</h5>
          </div>
        </div>
        {/* Tags */}
        <div className="row ">
          <div className="col-12 text-center mt-3 justify-content-start">
            {card.card.tags.map((tag) => {
              return (
                <button
                  key={tag}
                  onClick={() => {
                    window.location = `/serchTagTrainer/${tag}`;
                  }}
                  type="button"
                  className="tags"
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
        <hr />
        {/* contact user */}
        <div className="row justify-content-center">
          <div className="col-12 text-center mb-3">
            {/* contact buttons */}
            <button
              type="button"
              className="buttonEmail "
              onClick={() => (window.location = `mailto:${card.user.email}`)}
            >
              <i className="bi bi-envelope contactMeStyle "></i>
            </button>
            {/* send Whatsapp massage */}
            <button
              type="button"
              className=" buttonWhatsapp "
              onClick={() =>
                (window.location = `https:api.whatsapp.com/send?phone=${card.user.phone}`)
              }
            >
              <i className="bi bi-whatsapp"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default TemplateCardTrainer;
