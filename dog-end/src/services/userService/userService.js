import httpService from "../httpService";
import config from "../../config.json";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";

const TOKEN_KEY = "token";
const cookies = new Cookies();

httpService.setDefaultCommonHeaders("x-auth-token", getJwt());

export function createUser(user) {
  return httpService.post(`${config.apiUrl}/user`, user);
}

export function getInfoUser() {
  return httpService.get(`${config.apiUrl}/user/me`);
}

export function getInfoUserById(idUser) {
  return httpService.get(`${config.apiUrl}/user/${idUser}`);
}

export function updatePassword(pass) {
  return httpService.put(`${config.apiUrl}/user/reset-password`, pass);
}

export function sendEmailToRestPassword(email) {
  return httpService.post(`${config.apiUrl}/user/forgot-password`, email);
}

export function saveImage(data) {
  return httpService.post(`${config.apiUrl}/user/saveImage`, data);
}

export function editUser(data) {
  return httpService.put(`${config.apiUrl}/user`, data);
}

export function logout() {
  // localStorage.removeItem(TOKEN_KEY);
  cookies.remove(TOKEN_KEY);
  cookies.remove("data");
}

export function getJwt() {
  // return localStorage.getItem(TOKEN_KEY);
  return cookies.get(TOKEN_KEY);
}

export function getUser() {
  try {
    const token = getJwt();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export async function login(email, password) {
  const { data } = await httpService.post(`${config.apiUrl}/auth`, {
    email,
    password,
  });

  cookies.set(TOKEN_KEY, data.token);
  // localStorage.setItem(TOKEN_KEY, data.token);
}

const service = {
  createUser,
  login,
  getJwt,
  logout,
  getUser,
  getInfoUser,
  getInfoUserById,
  editUser,
  saveImage,
  sendEmailToRestPassword,
  updatePassword,
};

export default service;
