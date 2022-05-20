import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import userService from "../../services/userService/userService";
import walkerService from "../../services/dogWalker/cardServiceDogWalker";
import { useCookies } from "react-cookie";
import config from "../../config.json";

//card: contain details about cardWalker
//setUpdatePage:update favorite page when delete it from favorite
const TemplateCardWalker = ({ card, setUpdatePage }) => {
  const [cookies, setCookie] = useCookies(["data"]);
  const [load, setLoad] = useState({});
 
  //variable its contains true if the card in the favorite
  const [cardFv, setCardFv] = useState(null);

  //if current card add to favorite then update cuurent card
  const [cardFvAdd, setCardFvAdd] = useState(false);

  // check if current card exists in the current user.
  const checkExistFavoriteCard = async () => {
    try {
      setLoad(true);

      let flag = await walkerService.checkFavoriteCard(card.card._id);

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

      let user = await walkerService.addFavoriteCard({
        fDogWalker: [card.card._id],
      });
      setCardFvAdd(true);
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
      await walkerService.deleteFavoriteCard({
        fDogWalker: [card.card._id],
      });

      setCardFvAdd(false);
      if (setUpdatePage) {
        window.location = "/favoriteWalker";
      }
    } catch ({ response }) {
      console.log(response.data);
    }
  };

  useEffect(() => {
    checkExistFavoriteCard();
  }, [cardFvAdd]);

  useEffect(() => {
    checkExistFavoriteCard();
  }, []);

  if (load) {
    return <h1>loading ...</h1>;
  }

  return (
    <>
      <div className="containerTrainer mt-3 col-6">
        {/* CARD */}
        <div className="card">
          <h3>{card.user.firstName}</h3>
          <div className="imgBx">
            <img
              src={
                card.user.image
                  ? `${config.pictureUrl}${card.user._id}.jpg`
                  : config.defaultImage
              }
            />
          </div>
          <div className="contentBx">
            <div className="info">
              <h2>{card.user.firstName}</h2>
              <br />
            </div>
            <div className="info">
              <h5> {`עלות : ${card.card.cost}`}</h5>
            </div>
            <div className="info">
              <h5> {`שיטת אילוף : ${card.card.trainWay}`}</h5>
            </div>

            <button
              type="button"
              className=" buttonEmail "
              onClick={() =>
                (window.location = `mailto:tomaviram2187@gmail.com`)
              }
            >
              <i className="bi bi-envelope contactMeStyle "></i>
            </button>
            {/* send Whatsapp massage */}
            <button
              type="button"
              className=" buttonWhatsapp "
              onClick={() =>
                (window.location = `https://api.whatsapp.com/send?phone=+972528881056$&amp;text="Hi there! I have a question :)"`)
              }
            >
              <i className="bi bi-whatsapp"></i>
            </button>
            {/* send find me */}
            <button
              type="button"
              className=" buttonFindMe "
              onClick={() =>
                (window.location = `https://ul.waze.com/ul?place=ChIJH3w7GaZMHRURkD-WwKJy-8E&ll=32.08529990%2C34.78176760&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location`)
              }
            >
              <i className="bi bi-geo contactMeStyle "></i>
            </button>
            <a href="mailTo:someone@yoursite.com">צור קשר</a>

            {/* delete */}
            {card && card.card.user_id === cookies.data._id && (
              <Link className="ml-1 " to={`/deleteCardWalker/${card.card._id}`}>
                <button type="button" className="btnDelete ">
                  <i className="bi bi-trash"></i>
                </button>
              </Link>
            )}

            {/* edit button */}
            {card && card.card.user_id === cookies.data._id && (
              <Link to={`/editCardWalker/${card.card._id}`}>
                <b>
                  <button type="button" className="btnEdit m-1">
                    <i className="bi bi-pen"></i>
                  </button>
                </b>
              </Link>
            )}

            {cardFv &&
              !cardFv.data &&
              card &&
              card.card.user_id !== cookies.data._id && (
                <button
                  type="button"
                  className="btnDelete "
                  onClick={addFavoriteCard}
                >
                  ממועדפים
                </button>
              )}

            {cardFv && cardFv.data && card.card.user_id !== cookies.data._id && (
              <button
                type="button"
                className="btnDelete"
                onClick={deleteFavoriteCard}
              >
                הסרה ממועדפים
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default TemplateCardWalker;
