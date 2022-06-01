import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
// import userService from "./services/userService/userService";

// CSS
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "./trainer.css";
import "./walker.css";
import { ToastContainer } from "react-toastify";

// components
import Home from "./components/pages/home";
import Footer from "./components/footer";
import SignUp from "./components/pages/signUp";
import LoginTo from "./components/pages/login";
import Logout from "./components/pages/logOut";
import Chat from "./components/pages/chat";
import MyPark from "./components/pages/myPark";
import Article from "./components/pages/article";
import Navigation from "./components/navigation";
import AllwalkersCards from "./components/walker/AllWalkersCards";
import AllTrainersCards from "./components/trainer/AllTrainersCards";
import Profile from "./components/pages/profile";
import TemplateCardWalker from "./components/walker/templateCardWalker";
import TemplateCardTrainer from "./components/trainer/templateCardTrainer";
import CardTrainer from "./components/trainer/templateCardTrainer";
import CreateCardTrainer from "./components/trainer/createCardTrainer";
import CreateCardWalker from "./components/walker/createCardWalker";
import DeleteCardWalker from "./components/walker/deleteCardWalker";
import DeleteCardTrainer from "./components/trainer/deleteCardTrainer";
import EditCardWalker from "./components/walker/editCardWalker";
import EditCardTrainer from "./components/trainer/editCardTrainer";
import EditUser from "./components/pages/user/editUser";
import { useParams } from "react-router-dom";

import ContactUs from "./components/pages/contactUs";
import FavoriteWalker from "./components/walker/favoriteWalker";
import FavoriteTrainer from "./components/trainer/favoriteTrainer";
import SerchWalkerTags from "./components/walker/serchWalkerTags";
import SerchTrainerTags from "./components/trainer/serchTrainerTags";
import ForgotEmail from "./components/pages/user/frogotEmail";
import UpdatePassword from "./components/pages/user/updatePassword";

function App() {
  const param = useParams();
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/login" element={<LoginTo />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/myPark" element={<MyPark />} />
        <Route path="/article" element={<Article />} />
        <Route path="/dogwalker" element={<AllwalkersCards />} />
        <Route path="/dogtrainer" element={<AllTrainersCards />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/templateCardWalker" element={<TemplateCardWalker />} />
        <Route path="/templateCardTrainer" element={<TemplateCardTrainer />} />
        <Route path="/cardTrainer" element={<CardTrainer />} />
        <Route path="/createCardTrainer" element={<CreateCardTrainer />} />
        <Route path="/createCardWalker" element={<CreateCardWalker />} />
        <Route path="/deleteCardWalker/:id" element={<DeleteCardWalker />} />
        <Route path="/deleteCardTrainer/:id" element={<DeleteCardTrainer />} />
        <Route path="/editCardWalker/:id" element={<EditCardWalker />} />
        <Route path="/editCardTrainer/:id" element={<EditCardTrainer />} />
        <Route path="/editUser" element={<EditUser />} />
        <Route path="/favoriteWalker" element={<FavoriteWalker />} />
        <Route path="/favoriteTrainer" element={<FavoriteTrainer />} />
        <Route path="/serchTagWalker/:tag" element={<SerchWalkerTags />} />
        <Route path="/serchTagTrainer/:tag" element={<SerchTrainerTags />} />
        <Route path="/sendEmail" element={<ForgotEmail />} />
        <Route path="/reset-password/:id/:token" element={<UpdatePassword />} />
      </Routes>
      <Footer className="footer-all" />
    </BrowserRouter>
  );
}

export default App;
