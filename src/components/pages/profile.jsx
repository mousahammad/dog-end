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
    return <h1>Loading ...</h1>;
  }

  return (
    <Container>
      <div className="mt-3">
        <div className="card">
          {/* card body */}
          <div className="card-body">
            <h2 className="d-flex justify-content-center ">
              My profile {data.dogWalker ? "as a dog-walker" : ""}
              {data.dogWalker && data.dogTrainer ? " and" : ""}
              {data.dogTrainer ? " as a dog-trainer" : ""}
            </h2>
            <div></div>

            {/* edit button */}
            <Link to={`/editUser`}>
              <b>
                <button type="button" className="btnEdit m-1">
                  <i className="bi bi-pen"></i>עריכה
                </button>
              </b>
            </Link>
            {/* delete button */}
            <span></span>
            <Link className="ml-2 " to={`/my-cards/delete/`}>
              <button type="button" className="btnDelete ">
                <i className="bi bi-trash"></i> מחיקה
              </button>
            </Link>

            {/* card image */}
            <div className="row">
              <div className="col-lg-6 ">
                <img
                  src={
                    data.image
                      ? `${config.pictureUrl}${data._id}.jpg`
                      : config.defaultImage
                  }
                  className="cardImg"
                  alt="X"
                />
              </div>
              <div className="col-lg-6">
                <div className="buttonsCards">
                  <br />
                  <br />
                  {/* -------------------------------------------- */}
                  {/* CreateCardTrainer */}
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
                    <EditCardTrainer cardId={dataT.card._id} />
                  )}
                  <br />
                  <br />
                  {cardTrainer ? (
                    <>
                      <div className="container text-center">
                        <h3>מאלפ/ת</h3>
                      </div>
                      <CreateCardTrainer />
                    </>
                  ) : (
                    ""
                  )}
                  <br />
                  <br />
                  ------------------------------------------------------------
                  {/*  CreateCardWalker  */}
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
                    <EditCardWalker cardId={dataW.card._id} />
                  )}
                </div>
                {cardWalker ? (
                  <>
                    <div className="container text-center">
                      <h3>דוגווקר/ית</h3>
                    </div>
                    <CreateCardWalker />
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* ---------------------------------------------------------------------------------------------- */}
            <br />
            <br />
            <h5 className="cardName"> שם פרטי: {data.firstName}</h5>
            <p className="cardTitle">
              <b>
                קצת עליי:
                {data.dogWalker ? "a dog-walker" : ""}
                {data.dogWalker && data.dogTrainer ? " and" : ""}
                {data.dogTrainer ? " a dog-trainer" : ""}
              </b>
              <br />
            </p>
            <div className="card-text border-top pt-2">
              <h3 className="cardInfo"> עוד קצת פרטים: </h3>
              <b>טלפון:</b> <span>{data.phone}</span>
              <br />
              <b>כתובת:</b> <span>{data.city}</span>
              <br />
              <b>מייל:</b> <span>{data.email}</span>
              <br />
              <br />
              <FavoriteWalker />
              <br />
            
              <hr />
              {/* buttons */}
              <div className="col-md-12">
                <div className="buttons">
                  <br />
                  <b>צור קשר: </b>
                  <br />
                  {/* send Email massage */}
                  <button
                    type="button"
                    className=" buttonEmail "
                    onClick={() => (window.location = `mailto:${data.email}`)}
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
                  {dataW !== null && dataW && (
                    <TemplateCardWalker card={dataW} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Profile;
