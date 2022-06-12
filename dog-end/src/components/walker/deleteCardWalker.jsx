import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WalkerService from "../../services/dogWalker/cardServiceDogWalker";

function DeleteCardWalker({}) {
  const params = useParams();
  const nav = useNavigate();
  const deleteCard = async () => {
    await WalkerService.deleteCard(params.id);
    nav(`/${params.location}`);
  };
  useEffect(() => {
    deleteCard();
  }, []);
  return null;
}

export default DeleteCardWalker;
