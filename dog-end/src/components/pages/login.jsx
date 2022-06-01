import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import userService, { login } from "../../services/userService/userService";
import { Formik } from "formik";
import { useCookies } from "react-cookie";
import { Link, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginTo = () => {
  const [cookies, setCookie] = useCookies(["data"]);
  const navigate = useNavigate();

  console.log("cookies data", cookies.data);

  if (cookies.data) {
    window.location = "/profile";
  }

  return (
    <Container>
      <Formik
        initialValues={{
          email: "",
          password: "",
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
          if (!values.password) {
            errors.password = "Required";
          } else if (
            values.password.length < 6 ||
            values.password.length > 255
          ) {
            errors.password = "Invalid password";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          try {
            await userService.login(values.email, values.password);
            // ToastContainer
            toast.success("🦄 נרשמתם בהצלחה", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            window.location = "/home";
            // console.log(data);
          } catch ({ response }) {
            // ToastContainer
            toast.error("😯 התחברות לא הצליחה", {
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
                  <br />
                  <label htmlFor="inputPassword" className="sr-only ">
                    סיסמה
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control "
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="password"
                  />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                  <br />

                  <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    כניסה
                  </button>
                </form>

                <button
                  className="btn btn-lg btn-primary btn-block"
                  onClick={() => {
                    navigate("/sendEmail");
                  }}
                >
                  שכחתי סייסמה
                </button>
              </div>
            </div>
          </>
        )}
      </Formik>
    </Container>
  );
};
export default LoginTo;
