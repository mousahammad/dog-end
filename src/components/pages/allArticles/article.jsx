import React from "react";
import { Container } from "react-bootstrap";
import GeneralArticle from "./generalArticle";

const Article = () => {
  return (
    <>
      {/* hero */}
      <div className="d-flex flex-column px-4 py-2 my-5  text-center">
        <img
          className="img_banner d-block mx-auto mb-4"
          src="https://images.pexels.com/photos/1485637/pexels-photo-1485637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          width="350"
          height="210"
        />
        <h1 className="display-5 fw-bold">מאמרים בתחום הכלבנות</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Quickly design and customize responsive mobile-first sites with
            Bootstrap, the world’s most popular front-end open source toolkit,
            featuring Sass variables and mixins, responsive grid system,
            extensive prebuilt components, and powerful JavaScript plugins.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" className="btn btn-primary btn-lg px-4 gap-3">
              take me
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
            >
              Secondary
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            window.location = `/GeneralArticle/כלבים/loremdsfafafsas`;
          }}
        >
          tom
        </button>
        
      </div>
    </>
  );
};

export default Article;
