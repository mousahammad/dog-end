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
      setCardFv({ data: true });
    } catch ({ response }) {
      console.log(response.data);
    }
  };
  // delete from favorite cards
  const deleteFavoriteCard = async () => {
    try {
      if (!card) {
        return;
      }
      console.log(card.card._id);
      await walkerService.deleteFavoriteCard({
        fDogWalker: [card.card._id],
      });

      setCardFv({ data: false });
      if (setUpdatePage) {
        window.location = "/favoriteWalker";
      }
    } catch ({ response }) {
      console.log(response.data);
    }
  };

  useEffect(() => {
    checkExistFavoriteCard();
  }, []);

  if (load) {
    return <h1>טוען ...</h1>;
  }

  return (
    <div className="container borderStyle">
      <div className="row">
        <div className="col-4 justify-content-center">
          <button className="btnDelete">delete</button>
          {/* delete */}
          {card && card.card.user_id === cookies.data._id && (
            <Link className="ml-1 " to={`/deleteCardWalker/${card.card._id}`}>
              <button type="button" className="btnDelete ">
                <i className="bi bi-trash"></i>
              </button>
            </Link>
          )}
          <button className="btnEdit">Edit</button>
          {/* edit button */}
          {card && card.card.user_id === cookies.data._id && (
            <Link to={`/editCardWalker/${card.card._id}`}>
              <b>
                <button type="button" className=" m-1">
                  <i className="bi bi-pen"></i>
                </button>
              </b>
            </Link>
          )}
        </div>
        <div className="col-4 mb-3 text-center">
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
          {/* favorite Buttons */}
          {cardFv &&
            !cardFv.data &&
            card &&
            card.card.user_id !== cookies.data._id && (
              <button
                type="button"
                className="Favorite_btn "
                onClick={addFavoriteCard}
              >
                <svg
                  xmlns="http:www.w3.org/2000/svg"
                  width="46"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              </button>
            )}
          {cardFv && cardFv.data && card.card.user_id !== cookies.data._id && (
            <button
              type="button"
              className="FavoriteDele_btn"
              onClick={deleteFavoriteCard}
            >
              <svg
                xmlns="http:www.w3.org/2000/svg"
                width="46"
                height="16"
                fill="red"
                className="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 text-center borderStyleColor">
          <h2>{card.user.firstName}</h2>
          <h5> {`עלות : ${card.card.cost}`} בשקלים</h5>
          <h5> {`טלפון : ${card.user.phone}`}</h5>
          <h5> {`אימייל : ${card.user.email}`}</h5>
        </div>
      </div>
      <div className="row ">
        <div className="col-12 text-center mt-3 justify-content-space-evenly">
          {card.card.tags.map((tag) => {
            return (
              <button
                key={tag}
                onClick={() => {
                  window.location = `/serchTagWalker/${tag}`;
                }}
                type="button"
                className="tags "
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
      <hr />
      <div className="row justify-content-center">
        <div className="col-12 text-center  mb-3">
          <button
            type="button"
            className=" buttonEmail "
            onClick={() => (window.location = `mailto:tomaviram2187@gmail.com`)}
          >
            <i className="bi bi-envelope contactMeStyle "></i>
          </button>
          {/* send Whatsapp massage */}
          <button
            type="button"
            className=" buttonWhatsapp "
            onClick={() =>
              (window.location = `https:api.whatsapp.com/send?phone=+972${card.phone}$&amp;text="Hi there! I have a question :)"`)
            }
          >
            <i className="bi bi-whatsapp"></i>
          </button>
          {/* send find me */}
          <button
            type="button"
            className=" buttonFindMe "
            onClick={() =>
              (window.location = `https:ul.waze.com/ul?place=ChIJH3w7GaZMHRURkD-WwKJy-8E&ll=32.08529990%2C34.78176760&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location`)
            }
          >
            <i className="bi bi-geo contactMeStyle "></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export default TemplateCardWalker;
