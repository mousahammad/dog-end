import React from "react";
import { Container } from "react-bootstrap";

const MyPark = () => {
  return(
  <Container>
    <div className="px-4 py-5 my-5 text-center">
      <img
        className="d-block mx-auto mb-4"
        src="https://cdn.pixabay.com/photo/2019/03/21/11/57/people-4070864_960_720.jpg"
        alt=""
        width="350"
        height="210"
      />
      <h1 className="display-5 fw-bold">גינות כלבים</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Quickly design and customize responsive mobile-first sites with
          Bootstrap, the world’s most popular front-end open source toolkit,
          featuring Sass variables and mixins, responsive grid system, extensive
          prebuilt components, and powerful JavaScript plugins.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button type="button" className="btn btn-primary btn-lg px-4 gap-3">
            אני בגינה
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-lg px-4"
          >
            מי בגינה
          </button>
        </div>
      </div>
    </div>
  </Container>
  );
};

export default MyPark;
