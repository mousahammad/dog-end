import TemplateCardWalker from "./templateCardWalker";
import React, { useState, useEffect } from "react";
import walkerService from "../../services/dogWalker/cardServiceDogWalker";
import { toast } from "react-toastify";
import userService from "../../services/userService/userService";
import AllCards from "../common/allCards";
import { Container } from "react-bootstrap";

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
    return (
      <div className="Container">
        <div className="row">
          <div className="col-sm-12 col-md-3 "></div>
          <div className="col-sm-12 col-md-6 text-center mt-5">
            <h1 className="alert align-items center">
              כדי לצפות בעמוד דוגווקרים <br />
              יש להתחבר לשירות 🐶
            </h1>
          </div>
          <div className="col-sm-12 col-md-3 "></div>
        </div>
      </div>
    );
  }
  return (
    <Container>
      <div className="px-1 py-5 my-1 text-center">
        <img
          className="d-block col-12 mx-auto mb-4"
          src="https://images.unsplash.com/photo-1600077106724-946750eeaf3c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=639&ixid=MnwxfDB8MXxyYW5kb218MHx8ZG9nfHx8fHx8MTY1MDM5OTcwMA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1380"
          alt=""
          width="100%"
          height="auto"
        />
        <h1 className="display-5 fw-bold">
          הדוגווקרים של <span>DOGIT</span>
        </h1>
        <div className="col-lg-8 mx-auto">
          <p className="lead mb-4">
            כאן תוכלו למצוא רשימה של דוגווקרים שיהיו שמחים לתת יד, ולהוציא את
            כלביכם בזמן שאתם לא יכולים. אם אתם בעבודה עד מאוחר, רוצים לצאת לשתות
            בירה או בחו"ל בנסיעת עבודה או סתם בחופשה קצרה. כל מה שנשאר לכם לעשות
            זה לבחור מבין הרשימה את הבנאדם המתאים וליצור איתו קשר.
          </p>
          <hr />
        </div>
      </div>

      <AllCards
        Comp={TemplateCardWalker}
        cards={cards}
        loading={loading}
        numberPage={6}
        Message={"עדיין אין כרטיסים במערכת.. 🤷‍♂️"}
        NameCards={"כרטיסי דוג ווקר"}
      />
    </Container>
  );
};

export default AllWalkersCards;
