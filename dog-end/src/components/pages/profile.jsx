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
    return <h1>טוען...</h1>;
  }

  return (
    <div className="container border border-1">
      <div className="row mt-2 py-2">
        <div className="col-8 text-center">
          <h1>
            הפרופיל שלי {data.dogWalker ? "כ-דוגווקר" : ""}
            {data.dogWalker && data.dogTrainer ? " וגם" : ""}
            {data.dogTrainer ? " כ-מאלף כלבים" : ""}
          </h1>
        </div>
        {/* <div className="col-4 text-center"></div> */}
        <div className="col-4 text-center">
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
            <button type="button" className="btnDelete">
              <i className="bi bi-trash"></i> מחיקה
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
        <div className="col-12 text-center mt-5 ">
          <div
            className={!data.dogWalker && !data.dogTrainer ? "col-6" : "col-12"}
          >
            <img
              src={
                data.image
                  ? `${config.pictureUrl}${data._id}.jpg`
                  : config.defaultImage
              }
              className="cardImg mb-4"
              alt="profile photo"
            />
            <hr />
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-4 text-center">
              <h2 className="mb-1">צור קשר: </h2>
              <br />
            </div>
            <div className="col-sm-6 col-md-4  text-center">
              {/* send Email massage */}
              <button
                type="button"
                className=" buttonEmail col-6"
                onClick={() => (window.location = `mailto:${data.email}`)}
              >
                <i className="bi bi-envelope contactMeStyle "></i>
              </button>
              {/* send Whatsapp massage */}
              <button
                type="button"
                className=" buttonWhatsapp col-6 "
                onClick={() =>
                  (window.location = `https:wa.me/+972${data.phone.slice(1)}`)
                }
              >
                <i className="bi bi-whatsapp"></i>
              </button>
            </div>
            <div className="col-6"></div>

            {/* main content of the profile */}
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-4 mt-4">
                <h2 className="cardName">
                  <b>
                    <u>שם פרטי:</u>
                  </b>{" "}
                  {data.firstName}
                </h2>
                <h2>
                  <b>
                    <u>טלפון:</u>
                  </b>{" "}
                  <span>{data.phone}</span>
                </h2>
                <br />
                <h2>
                  <b>
                    <u>כתובת:</u>
                  </b>{" "}
                  {data.city}
                </h2>
                <br />
                <h2>
                  <b>
                    <u>אי-מייל:</u>
                  </b>{" "}
                  {data.email}
                </h2>
                <br />
                <br />
                {data.dogWalker || data.dogTrainer ? (
                  <p className="cardTitle">
                    <h3>
                      <b>
                        <u>תחום התמקצעות:</u>
                      </b>{" "}
                    </h3>
                    <div className="col-12">
                      <h1>
                        {data.dogWalker ? "דוגווקר" : ""}
                        {data.dogWalker && data.dogTrainer ? " and" : ""}
                        {data.dogTrainer ? " מאלף כלבים" : ""}
                      </h1>

                      <br />
                    </div>
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* create cards */}
      <div className="row">
        <div className="col-sm-12 col-md-6 text-center">
          <div className="buttonsCards">
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

            {cardTrainer ? (
              <>
                <div className="d-flex">
                  <h3>מאלפ/ת</h3>
                </div>
                <CreateCardTrainer />
              </>
            ) : (
              ""
            )}
            <br />
            <br />

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
        <hr />
      <div className="row">
        <div className="col-12 ">
          <FavoriteWalker />
          <FavoriteTrainer />
        </div>
      </div>
    </div>

    // <Container>
    //   <div className="mt-4">
    //     <div className="card">
    //       {/*top card body */}
    //       <div className="d-flex row ">
    //         <div className="justify-content-center">
    //           <h2 className="text-center">
    //             הפרופיל שלי{" "}
    //             <h1>
    //               {" "}
    //               {data.dogWalker ? "כ-דוגווקר" : ""}
    //               {data.dogWalker && data.dogTrainer ? " וגם" : ""}
    //               {data.dogTrainer ? " כ-מאלף כלבים" : ""}
    //             </h1>
    //           </h2>
    //           {/* edit button */}
    //           <Link to={`/editUser`}>
    //             <b>
    //               <button type="button" className="btnEdit m-1">
    //                 <i className="bi bi-pen"></i>עריכה
    //               </button>
    //             </b>
    //           </Link>
    //           {/* delete button */}
    //           <span></span>
    //           <Link className="ml-2 " to={`/my-cards/delete/`}>
    //             <button type="button" className="btnDelete ">
    //               <i className="bi bi-trash"></i> מחיקה
    //             </button>
    //           </Link>
    //         </div>
    //       </div>

    //       {/* edit password */}
    //       <Link to={`/reset-password/${cookies.data._id}/${cookies.token}`}>
    //         <b>
    //           <button type="button" className="btnEdit m-1">
    //             <i className="bi bi-pen"></i>עריכת סיסמה
    //           </button>
    //         </b>
    //       </Link>

    //       <>
    //         <div className="row">
    //         {/* card image */}
    //           <div
    //             className={
    //               !data.dogWalker && !data.dogTrainer ? "col-6" : "col-6"
    //             }
    //           >
    //             <img
    //               src={
    //                 data.image
    //                   ? `${config.pictureUrl}${data._id}.jpg`
    //                   : config.defaultImage
    //               }
    //               className="cardImg mb-4"
    //               alt="X"
    //             />
    //           </div>
    //           <hr />
    //           <div className="createCards ">
    //             <div className="buttonsCards col-md-12 col-lg-6">
    //               {/* CreateCardTrainer */}
    //               {data.dogTrainer && !dataT ? (
    //                 <button
    //                   type="button"
    //                   className="CreateCardTrainer"
    //                   onClick={() => setCardTrainer(!cardTrainer)}
    //                 >
    //                   <h5>יצירת כרטיס מאלפ/ת</h5>
    //                 </button>
    //               ) : (
    //                 dataT !== null && (
    //                   <button
    //                     type="button"
    //                     className="CreateCardTrainer"
    //                     onClick={() => setEditT(!editT)}
    //                   >
    //                     <h5>עריכת כרטיס מאלפ/ת</h5>
    //                   </button>
    //                 )
    //               )}
    //               {dataT !== null && editT && (
    //                 <EditCardTrainer cardId={dataT.card._id} />
    //               )}
    //               <br />

    //               {cardTrainer ? (
    //                 <>
    //                   <div className="d-flex">
    //                     <h3>מאלפ/ת</h3>
    //                   </div>
    //                   <CreateCardTrainer />
    //                 </>
    //               ) : (
    //                 ""
    //               )}
    //               <br />
    //               <br />

    //               {/*  CreateCardWalker  */}
    //               {data.dogWalker && !dataW ? (
    //                 <button
    //                   type="button"
    //                   className="CreateCardWalker"
    //                   onClick={() => setCardWalker(!cardWalker)}
    //                 >
    //                   <h5>יצירת כרטיס דוגווקר/ית</h5>
    //                 </button>
    //               ) : (
    //                 dataW !== null && (
    //                   <button
    //                     type="button"
    //                     className="CreateCardWalker"
    //                     onClick={() => setEditW(!editW)}
    //                   >
    //                     <h5>עריכת כרטיס דוגווקר/ית</h5>
    //                   </button>
    //                 )
    //               )}
    //               {dataW !== null && editW && (
    //                 <EditCardWalker cardId={dataW.card._id} />
    //               )}
    //             </div>
    //             {cardWalker ? (
    //               <>
    //                 <div className="container text-center">
    //                   <h3>דוגווקר/ית</h3>
    //                 </div>
    //                 <CreateCardWalker />
    //               </>
    //             ) : (
    //               ""
    //             )}
    //           </div>
    //         </div>

    //         {/* ---------------------------------------------------------------------------------------------- */}
    //         <br />
    //         <br />
    //         <b>צור קשר: </b>
    //         <br />
    //         {/* send Email massage */}
    //         <button
    //           type="button"
    //           className=" buttonEmail "
    //           onClick={() => (window.location = `mailto:${data.email}`)}
    //         >
    //           <i className="bi bi-envelope contactMeStyle "></i>
    //         </button>
    //         {/* send Whatsapp massage */}
    //         <button
    //           type="button"
    //           className=" buttonWhatsapp "
    //           onClick={() =>
    //             (window.location = `https://wa.me/+972${data.phone.slice(1)}`)
    //           }
    //         >
    //           <i className="bi bi-whatsapp"></i>
    //         </button>
    //         <h5 className="cardName"> שם פרטי: {data.firstName}</h5>
    //         {data.dogWalker || data.dogTrainer ? (
    //           <p className="cardTitle">
    //             <b>
    //               קצת עליי:
    //               {data.dogWalker ? "a dog-walker" : ""}
    //               {data.dogWalker && data.dogTrainer ? " and" : ""}
    //               {data.dogTrainer ? " a dog-trainer" : ""}
    //             </b>
    //             <br />
    //           </p>
    //         ) : null}

    //         <div className="card-text border-top pt-2">
    //           <h3 className="cardInfo"> עוד קצת פרטים: </h3>
    //           <b>טלפון:</b> <span>{data.phone}</span>
    //           <br />
    //           <b>כתובת:</b> <span>{data.city}</span>
    //           <br />
    //           <b>מייל:</b> <span>{data.email}</span>
    //           <br />
    //           <br />
    //           <div className="col-12">
    //             <FavoriteWalker />

    //             <FavoriteTrainer />
    //           </div>
    //           <br />
    //           <hr />
    //           {/* My cards in the profile */}
    //           <div className="col-md-12">
    //             <div className="buttons">
    //               <br />
    //               {dataW !== null && dataW && (
    //                 <>
    //                   <h1>כרטיס דוגווקר שלי</h1>
    //                   <TemplateCardWalker card={dataW} />
    //                 </>
    //               )}

    //               {dataT !== null && dataT && (
    //                 <>
    //                   <h1>כרטיס מאלף שלי</h1>
    //                   <TemplateCardTrainer card={dataT} />
    //                 </>
    //               )}
    //             </div>
    //           </div>
    //         </div>
    //       </>
    //     </div>
    //   </div>
    // </Container>
  );
}

export default Profile;
