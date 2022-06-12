import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import CreateCardTrainer from "../trainer/createCardTrainer";
import CreateCardWalker from "../walker/createCardWalker";
import cardServiceW from "../../services/dogWalker/cardServiceDogWalker";
import cardServiceT from "../../services/dogTrainer/cardServiceDogTrainer";
import TemplateCardWalker from "../walker/templateCardWalker";
import EditCardWalker from "../walker/editCardWalker";
import EditCardTrainer from "../trainer/editCardTrainer";
import config from "../../config.json";
import FavoriteWalker from "../walker/favoriteWalker";
import TemplateCardTrainer from "../trainer/templateCardTrainer";
import FavoriteTrainer from "../trainer/favoriteTrainer";

function Profile() {
  const [cookies] = useCookies(["data"]);
  const { data } = cookies;
  const navigate = useNavigate();
  const [cardWalker, setCardWalker] = useState(false);
  const [cardTrainer, setCardTrainer] = useState(false);
  const [editW, setEditW] = useState(false);
  const [dataW, setDataW] = useState(null);
  const [editT, setEditT] = useState(false);
  const [dataT, setDataT] = useState(null);
  const [load, setLoad] = useState(true);

  const getWCard = async () => {
    let cardW = "";

    try {
      if (data.dogWalker) {
        cardW = await cardServiceW.getCardsByUser(data._id);
        setDataW({ card: cardW.data, user: data });
      }
    } catch ({ response }) {
      setDataW(null);
      console.log(response.data);
    }
  };
  const getTCard = async () => {
    let cardT = "";
    try {
      if (data.dogTrainer) {
        cardT = await cardServiceT.getCardsByUser(data._id);
        setDataT({ card: cardT.data, user: data });
      }
    } catch ({ response }) {
      setDataT(null);
      console.log(response.data);
    }
  };

  useEffect(() => {
    setLoad(true);
    getWCard();
    getTCard();
    setLoad(false);
  }, []);

  if (load) {
    return <h1>הב הב בעל הבית לא הגיע ...</h1>;
  }

  return (
    <div className="container">
      <div className="row mt-2 py-2">
        <div className="col-8 text-center">
          <h1>
            הפרופיל שלי {data.dogWalker ? "כ-דוגווקר" : ""}
            {data.dogWalker && data.dogTrainer ? " וגם" : ""}
            {data.dogTrainer ? " כ-מאלף כלבים" : ""}
          </h1>
        </div>

        <div className="col-4 text-center">
          {/* edit button */}
          <Link className="mr-2" to={`/editUser/${data._id}/profile`}>
            <button type="button" className="btnEdit">
              <i className="bi bi-pen"></i> עריכה
            </button>
          </Link>

          {/* edit password */}
          <Link to={`/reset-password/${cookies.data._id}/${cookies.token}`}>
            <b>
              <button type="button" className="ResetBtn mb-3">
                <i className="bi bi-pen"></i>עריכת סיסמה
              </button>
            </b>
          </Link>
        </div>
      </div>
      {/* image profile */}
      <div className="row">
        <div className="col-sm-4 col-lg-4"></div>
        <div className="col-sm-4 col-lg-4 text-center mt-5 ">
          <img
            src={
              data.image
                ? `${config.pictureUrl}${data._id}.jpg`
                : config.defaultImage
            }
            className="cardImg mb-4 "
            alt="profile photo"
          />
        </div>
        <div className="col-sm-4 col-lg-4"></div>
        <hr />
      </div>
      {/* contact me */}
     



      
      {/* main content of the profile */}
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-4 mt-4">
          <h4>
            <b>שם:</b> {data.firstName}
          </h4>
          <h4>
            <b>טלפון:</b> <span>{data.phone}</span>
          </h4>
          <h4>
            <b>כתובת:</b> {data.city}
          </h4>
          <h4>
            <b>אי-מייל:</b> {data.email}
          </h4>
        </div>
        <div className="col-12 text-center mt-5 mb-5">
          {data.dogWalker || data.dogTrainer ? (
            <div className="cardTitle">
              <h3>
                <u>
                  <b> תחום התמקצעות:</b>
                </u>{" "}
              </h3>
              <div className="col-12">
                <h1>
                  {data.dogWalker ? "דוגווקר" : ""}
                  {data.dogWalker && data.dogTrainer ? " ," : ""}
                  {data.dogTrainer ? " אילוף כלבים" : ""}
                </h1>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* create cards */}
      <div className="row">
        {/* CreateCardTrainer */}
        <div className="col-md-12 col-lg-6 text-center">
          {data.dogTrainer && !dataT ? (
            <button
              type="button"
              className="CreateCardTrainer"
              onClick={() => setCardTrainer(!cardTrainer)}
            >
              <h5>יצירת כרטיס מאלפ/ת</h5>
            </button>
          ) : (
            dataT !== null && (
              <button
                type="button"
                className="CreateCardTrainer"
                onClick={() => setEditT(!editT)}
              >
                <h5>עריכת כרטיס מאלפ/ת</h5>
              </button>
            )
          )}
          {dataT !== null && editT && (
            <EditCardTrainer cardId={dataT.card._id} location={"profile"} />
          )}
          <br />
          {cardTrainer ? (
            <>
              <div className="mt-5 text-center">
                <h3>מאלפ/ת</h3>
              </div>
              <CreateCardTrainer />
            </>
          ) : (
            ""
          )}
        </div>

        {/*  CreateCardWalker  */}
        <div className="col-md-12 col-lg-6 text-center">
          {data.dogWalker && !dataW ? (
            <button
              type="button"
              className="CreateCardWalker"
              onClick={() => setCardWalker(!cardWalker)}
            >
              <h5>יצירת כרטיס דוגווקר/ית</h5>
            </button>
          ) : (
            dataW !== null && (
              <button
                type="button"
                className="CreateCardWalker"
                onClick={() => setEditW(!editW)}
              >
                <h5>עריכת כרטיס דוגווקר/ית</h5>
              </button>
            )
          )}
          {dataW !== null && editW && (
            <EditCardWalker cardId={dataW.card._id} location={"profile"} />
          )}

          {cardWalker ? (
            <>
              <div className="mt-5 text-center">
                <h3>דוגווקר/ית</h3>
              </div>
              <CreateCardWalker />
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* FavoriteCards */}
      <div className="row mt-5">
        <hr />
        <div className="col-12 ">
          <FavoriteWalker />
          <FavoriteTrainer />
        </div>
      </div>
      {/* My cards in the profile */}
      <div className="row text-center">
        <h1 className="col-12 my-5">
          <u> הכרטיסים שלי</u>{" "}
        </h1>
      </div>
      
      <div className="row">
        <div className="col-12 col-md-6">
          {dataW !== null && dataW && (
            <>
              <h3>כרטיס דוגווקר שלי</h3>
              <TemplateCardWalker card={dataW} />
            </>
          )}
        </div>

        {dataT !== null && dataT && (
          <div className="col-12 col-md-6">
            <h3>כרטיס מאלף שלי</h3>
            <TemplateCardTrainer card={dataT} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
