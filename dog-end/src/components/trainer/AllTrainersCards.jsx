import React, { useState, useEffect } from "react";
import TemplateCardTrainer from "./templateCardTrainer";
import { toast } from "react-toastify";
import userService from "../../services/userService/userService";
import trainerService from "../../services/dogTrainer/cardServiceDogTrainer";
import AllCards from "../common/allCards";
import { Container } from "react-bootstrap";

const AllTrainersCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  //get inforamtion about user's cuurent card
  const getUserInf = async (user_id) => {
    try {
      let user = "";

      user = await userService.getInfoUserById(user_id);

      return user.data;
    } catch (err) {}
  };

  const getAllTrainer = async () => {
    try {
      let cards = [];
      setLoading(true);
      let trainer = await trainerService.getAllCards();

      for (let i = 0; i < trainer.data.length; i++) {
        let user = await getUserInf(trainer.data[i].user_id);

        cards.push({ card: trainer.data[i], user: user[0] });
      }

      setCards(cards);

      setLoading(false);
    } catch ({ response }) {
      // ToastContainer
      // toast.error("לא התחברת לא יהיה תוכן! 😯", {
      //   position: "top-center",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
      console.log(response);
    }
  };

  useEffect(() => {
    getAllTrainer();
  }, []);

  if (loading) {
    return (
      <div className="Container">
        <div className="row">
          <div className="col-sm-12 col-md-3 "></div>
          <div className="col-sm-12 col-md-6 text-center mt-5">
            <h1 className="alert align-items center">
              כדי לצפות בעמוד מאלפים <br />
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
          המאלפים של <span>DOGIT</span>
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            כאן תוכלו למצוא רשימה של מאלפים ומאלפות שיהיו שמחים לתת לכם קצת
            מהידע שלהם ויעזרו לכלבייכם בכל צורה או בעיה שיש להם, כל מה שנשאר לכם
            לעשות הוא רק לבחור את הבנאדם המתאים עבורכם.
          </p>
          <hr />
        </div>
      </div>
      <AllCards
        Comp={TemplateCardTrainer}
        cards={cards}
        loading={loading}
        numberPage={6}
        Message={"עדיין אין כרטיסים במערכת.. 🤷‍♂️"}
        NameCards={"כרטיסי מאלפים"}
      />
    </Container>
  );
};

export default AllTrainersCards;
