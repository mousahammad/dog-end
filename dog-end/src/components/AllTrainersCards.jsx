import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import TemplateCardTrainer from "./trainer/templateCardTrainer";
import SearchBar from "../components/searchBar";




const AllTrainersCards = () => {
  return (
    <Container>
      <div className="px-1 py-5 my-1 text-center">
        <img
          className="d-block mx-auto mb-4"
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
      <div className="container">
        <div className="row ">
        <SearchBar placeholder="תחפשו מאלף או דוגווקר 🔍" onkeyup="myFunction()"  id="myFilter"/>

          <div className="col-lg-4 col-md-12">
            <TemplateCardTrainer />
          </div>
       
         
        </div>
      </div>
    </Container>
  );
};

export default AllTrainersCards;
