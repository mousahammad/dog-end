import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import userService from "../../../services/userService/userService";
import { Formik } from "formik";
import { useCookies } from "react-cookie";
import { Link, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

const UpdatePassword = () => {
  const params = useParams();
  if (!params.id || !params.token) {
    window.location = "/login";
  }

  return (
    <Container>
      <Formik
        initialValues={{
          password: "",
          retypePassword: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.password) {
            errors.password = "Required";
          } else if (!values.retypePassword) {
            errors.retypePassword = "Required";
          } else if (values.password !== values.retypePassword) {
            errors.password = errors.retypePassword = "הסיסמאות לא זהות";
          }

          return errors;
        }}
        onSubmit={async (values) => {
          try {
            if (values.password !== values.retypePassword) {
              return;
            }

            await userService.updatePassword({
              _id: params.id,
              tokenRef: params.token,
              password: values.password,
            });
            // ToastContainer
            toast.success("הסיסמה עודכנה בהצלחה ", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            window.location = "/login";
          } catch ({ response }) {
            // ToastContainer
            toast.error(response.data, {
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

                  <label htmlFor="password" className="sr-only">
                    סיסמה חדשה
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="password"
                  />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}

                  <label htmlFor="inputPassword2" className="sr-only">
                    הכנס סיסמה חדשה שוב
                  </label>
                  <input
                    type="password"
                    name="retypePassword"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.retypePassword}
                    placeholder="retypePassword"
                  />
                  {errors.retypePassword && touched.retypePassword ? (
                    <div>{errors.retypePassword}</div>
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
export default UpdatePassword;
