import httpService from "../httpService";
import config from "../../config.json";

export function createCardT(card) {
  // console.log(card);
  return httpService.post(`${config.apiUrl}/cardTrain`, card);
}

export function getAllCards() {
  return httpService.get(`${config.apiUrl}/cardTrain`);
}

export function getCard(id) {
  return httpService.get(`${config.apiUrl}/cardTrain/${id}`);
}

export async function getCardsByTag(tag) {
  return httpService.get(`${config.apiUrl}/cardTrain/serchByTag/${tag}`);
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
  return httpService.delete(`${config.apiUrl}/cardTrain/${id}`);
}

const cardService = {
  createCardT,
  getAllCards,
  getCard,
  getAllFavoriteTrainer,
  checkFavoriteCard,
  deleteFavoriteCard,
  addFavoriteCard,
  editCard,
  deleteCard,
  getCardsByUser,
  getCardsByTag,
};

export default cardService;
