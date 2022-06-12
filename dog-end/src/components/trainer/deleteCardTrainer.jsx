import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import trainerService from "../../services/dogTrainer/cardServiceDogTrainer";

function DeleteCardTrainer({}) {
  const params = useParams();
  const nav = useNavigate();
  const deleteCard = async () => {
    await trainerService.deleteCard(params.id);
    nav(`/${params.location}`);
  };
  useEffect(() => {
    deleteCard();
  }, []);
  return null;
}

export default DeleteCardTrainer;
