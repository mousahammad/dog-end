// import SearchBar from "../searchBar";

import TemplateCardWalker from "./templateCardWalker";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import cardService from "../../services/dogWalker/cardServiceDogWalker";
import AllCards from "../common/allCards";

const FavoriteWalker = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  //get all favorite walkers
  const getAllWalkers = async () => {
    try {
      let myCards = [];
      setLoading(true);
      myCards = await cardService.getAllFavoriteWalker();
      setCards(myCards.data);

      setLoading(false);
    } catch ({ response }) {
      // ToastContainer
      toast.error("לא התחברת לא יהיה תוכן! 😯 " + response.data, {
        position: "top-center",
        autoClose: 5000,
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
    return <h1>טוען תוכן...</h1>;
  }

  return (
    //Comp, cards, setUpdatePage, loading, numberPage }
    <AllCards
          Comp={TemplateCardWalker}
      cards={cards}
      setUpdatePage={true}
      loading={loading}
      numberPage={2}
      Message={"עדיין לא סימנת מועדפים.. 🤷‍♂️ בדוגווקר"}
      NameCards={"כרטיסי דוג ווקר המועדפים עליי"}
    />
  );
};

export default FavoriteWalker;
