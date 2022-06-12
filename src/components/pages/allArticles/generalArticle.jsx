import React from "react";
import {useNavigate} from 'react-router-dom';

const GeneralArticle = ({ title, text }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="row text-center">
        <h1>{title}</h1>
      </div>
           <div className="row text-center">
        <p>{text}</p>
      </div>
      <div className="row text-center">
        <div className="col-6">
        <button onClick={()=>navigate(-1)}>Back</button>
        </div>
      </div>
    </>
  );
};



export default GeneralArticle;
