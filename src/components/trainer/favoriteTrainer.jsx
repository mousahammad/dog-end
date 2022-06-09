// import SearchBar from "../searchBar";

import TemplateCardTrainer from "./templateCardTrainer";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import cardService from "../../services/dogTrainer/cardServiceDogTrainer";
import AllCards from "../common/allCards";

const FavoriteTrainer = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  //get all favorite walkers
  const getAllTrainer = async () => {
    try {
      let myCards = [];
      setLoading(true);
      myCards = await cardService.getAllFavoriteTrainer();
      setCards(myCards.data);

      setLoading(false);
    } catch ({ response }) {
      // ToastContainer
      toast.error("לא התחברת לא יהיה תוכן! 😯 " + response.data, {
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
    getAllTrainer();
  }, []);

  if (loading) {
    return <h1>הב הב טוען תוכן...</h1>;
  }

  return (
    //Comp, cards, setUpdatePage, loading, numberPage }
    <AllCards
      Comp={TemplateCardTrainer}
      cards={cards}
      setUpdatePage={true}
      loading={loading}
      numberPage={2}
      Message={"עדיין לא סימנת מועדפים.. 🤷‍♂️ בטרינר"}
      NameCards={"כרטיסי טרינר המועדפים עליי"}
    />
  );
};

export default FavoriteTrainer;
