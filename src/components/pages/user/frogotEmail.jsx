import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import userService from "../../../services/userService/userService";
import { Formik } from "formik";
import { useCookies } from "react-cookie";
import { Link, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ForgotEmail = () => {
  return (
    <Container>
      <Formik
        initialValues={{
          email: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          return errors;
        }}
        onSubmit={async (values) => {
          try {
            await userService.sendEmailToRestPassword({ email: values.email });
            // ToastContainer
            toast.success("האימייל נשלח בהצלחה", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } catch ({ response }) {
            // ToastContainer
            toast.error("לא קיים אימייל זה במערכת", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            console.log(response.data);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <>
            <div className="center mt-5">
              <img
                className="imgCoverDogs mb-4"
                src="https://img.freepik.com/free-photo/group-portrait-adorable-puppies_53876-64778.jpg?t=st=1650619440~exp=1650620040~hmac=8cf1416422a68fccc45146015ef62624c1765e14da062568f06b482d207ec974&w=900"
                alt="dogs pic"
                width="auto"
                height="auto"
              />
            </div>
            {/* login form */}
            <br />
            <div className="container loginForm col-md-6">
              <div className="text-center pt-4 mt-3 ">
                <form onSubmit={handleSubmit} className="form-signin ">
                  <h1 className="h3 mb-3 font-weight-normal">..קדימה להתחבר</h1>

                  <label htmlFor="inputEmail" className="sr-only">
                    אימייל
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="email"
                  />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}

                  <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    שלח
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </Formik>
    </Container>
  );
};
export default ForgotEmail;
