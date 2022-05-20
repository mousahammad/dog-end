import httpService from "../httpService";
import config from "../../config.json";

export function createCardT(card) {
  // console.log(card);
    return httpService.post(`${config.apiUrl}/cardTrain`, card);
}

export function getMyCards() {
  // console.log("getMyCards");
  return httpService.get(`${config.apiUrl}/cards/my-cards`);
}

export function getCard(id) {
  return httpService.get(`${config.apiUrl}/cardTrain/${id}`);
}


export async function getAllFavoriteTrainer() {
  return httpService.get(`${config.apiUrl}/cardTrain/getAllFavoriteTrainer`);
}

export async function checkFavoriteCard(id) {
  return httpService.get(`${config.apiUrl}/cardTrain/checkFvCard/${id}`);
}

export async function deleteFavoriteCard(favorite) {
  console.log(favorite);
  return httpService.patch(`${config.apiUrl}/cardTrain/deleteT`, favorite);
}

export async function addFavoriteCard(favorite) {
  return httpService.patch(`${config.apiUrl}/cardTrain/addT`, favorite);
}

export function editCard(id, card) {
  console.log(id, card);
  return httpService.put(`${config.apiUrl}/cardTrain/${id}`, card);
}

export function getCardsByUser(idUser) {
  // console.log("getMyCards");
  return httpService.get(`${config.apiUrl}/cardTrain/byUser/${idUser}`);
}

export function deleteCard(id) {
  console.log("DeleteCard");
  return httpService.delete(`${config.apiUrl}/cards/${id}`);
}

const cardService = {
  createCardT,
  getMyCards,
  getCard,
  getAllFavoriteTrainer,
  checkFavoriteCard,
  deleteFavoriteCard,
  addFavoriteCard,
  editCard,
  deleteCard,
  getCardsByUser,

};

export default cardService;
