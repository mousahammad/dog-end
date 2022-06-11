import userService from "../../../services/userService/userService";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import config from "../../../config.json";

import { Formik } from "formik";

import React, { useState, useEffect } from "react";

import "./signUp.css";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
const TOKEN_KEY = "token";

const getDateFormat = (date) => {
  if (!date) {
    return "";
  }

  //conatan date in pices
  let arr = date.split("-");
  let arr2 = arr[2].split("T");

  return `${arr[0]}-${arr[1]}-${arr2[0]}`;
};

const EditUser = () => {
  const [cookies, setCookie] = useCookies(["data"]);
  const [load, setLoad] = useState(true);
  const params = useParams();

  //image upload states
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [userInfo, setUserInf] = useState(null);
  const [imgError, setImgError] = useState("");

  if (!cookies.data) {
    window.location = "/login";
  }
  // const regButton = document.getElementById("regButton");

  //get information about user from data base
  const getInfoUser = async () => {
    try {
      if (!params.id) {
        window.location = "/login";
      }
      setLoad(true);

      let info = await userService.getInfoUserById(params.id);

      if (info.data[0].image) {
        setImagePreview(config.pictureUrl + info.data[0]._id + ".jpg");
      } else {
        setImagePreview(config.defaultImage);
      }

      setUserInf(info.data[0]);
      setLoad(false);
    } catch ({ response }) {
      console.log(response.data);
    }
  };

  useEffect(() => {
    getInfoUser();
  }, []);

  function validateImg(e) {
    setImgError("");
    // regButton.disabled=false;
    const file = e.target.files[0];
    console.log(file);
    if (file.size >= 1048576) {
      //1048576
      setImgError("Image size maximum 1mb");
      // regButton.disabled = true;
      return false;
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
    console.log("change img");
  }

  const deleteImage = async () => {
    try {
      await userService.deleteImage(params.id);
      setUserInf((userInfo) => {
        return { ...userInfo, image: false };
      });

      setImagePreview(config.defaultImage);
    } catch ({ response }) {
      console.log(response.data);
    }
  };

  if (load) {
    return <h1>טעון תוכן ...</h1>;
  }

  return (
    <>
      {userInfo !== null && (
        <Container>
          <h1 className="text-center m-0">עדכון פרטיים אישיים</h1>
          <Row className="signUp-row">
            <Col className="signUP-2-col">
              {userInfo !== null && (
                <Formik
                  initialValues={
                    {
                      firstName: userInfo.firstName,
                      lastName: userInfo.lastName,
                      email: userInfo.email,
                      city: userInfo.city,
                      gender: userInfo.gender,
                      dateBirthDay: getDateFormat(userInfo.dateBirthDay),
                      admin: userInfo.admin,
                      dogTrainer: userInfo.dogTrainer,
                      dogWalker: userInfo.dogWalker,
                      phone: userInfo.phone,
                    } || {
                      firstName: userInfo.firstName,
                      lastName: userInfo.lastName,
                      email: userInfo.email,
                      city: userInfo.city,
                      gender: userInfo.gender,
                      dateBirthDay: getDateFormat(userInfo.dateBirthDay),
                      admin: userInfo.admin,
                      dogTrainer: userInfo.dogTrainer,
                      dogWalker: userInfo.dogWalker,
                      phone: userInfo.phone,
                    }
                  }
                  validate={(values) => {
                    const errors = {};

                    if (!values.firstName) {
                      errors.firstName = "Required";
                    } else if (
                      values.firstName.length < 2 ||
                      values.firstName.length > 255
                    ) {
                      errors.firstName = "Invalid firstName";
                    } else if (!/^[a-zA-Zא-ת]*$/i.test(values.firstName))
                      errors.firstName = "Your name is Invalid";

                    if (!values.lastName) {
                      errors.lastName = "Required";
                    } else if (
                      values.lastName.length < 2 ||
                      values.lastName.length > 255
                    ) {
                      errors.lastName = "Invalid lastName";
                    } else if (!/^[a-zA-Zא-ת ]*$/i.test(values.lastName))
                      errors.lastName = "Your lastName is Invalid";

                    if (!values.email) {
                      errors.email = "Required";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "Invalid email address";
                    }

                    // validation for Phone
                    if (!values.phone) {
                      errors.phone = "Required";
                    } else if (!/^0[2-9]\d{7,8}$/i.test(values.phone)) {
                      errors.phone = "Invalid phone number";
                    }

                    if (!values.city) {
                      errors.city = "Required";
                    } else if (
                      values.city.length < 2 ||
                      values.city.length > 400
                    ) {
                      errors.city = "Invalid city";
                    } else if (/^[0-9]*$/i.test(values.city))
                      errors.city = "Your city is Invalid";

                    if (!values.gender) {
                      errors.gender = "Required";
                    }
                    if (!values.dateBirthDay) {
                      errors.dateBirthDay = "Required";
                    } else if (
                      new Date(Date.now()).getUTCFullYear() -
                        new Date(values.dateBirthDay).getUTCFullYear() <=
                      16
                    ) {
                      errors.dateBirthDay = "הגיל שלך קטן מ-16";
                      console.log(errors.dateBirthDay);
                    }

                    return errors;
                  }}
                  //pic validation
                  onSubmit={async (values) => {
                    try {
                      if (imagePreview !== config.defaultImage) {
                        values.image = true;
                      } else {
                        values.image = false;
                      }

                      const data = {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        city: values.city,
                        gender: values.gender,
                        dateBirthDay: values.dateBirthDay,
                        admin: values.admin,
                        dogTrainer: values.dogTrainer,
                        dogWalker: values.dogWalker,
                        phone: values.phone,
                        image: values.image,
                      };

                      const user = await userService.editUser(data, params.id);
                      console.log(user.data.token);
                      setCookie(TOKEN_KEY, user.data.token);
                      if (values.image) {
                        let frmData = new FormData();
                        frmData.append("name", userInfo._id + ".jpg");
                        frmData.append("image", image);

                        await userService.saveImage(frmData);
                      }
                      // ToastContainer
                      toast.success("🦄 הכרטיס עודכן בהצלחה", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                      window.location = `/${params.location}`;
                    } catch ({ response }) {
                      console.log(response.data);
                    }
                  }}
                  enableReinitialize
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <Container style={{ width: "100%", height: "100%" }}>
                      <div>
                        {/* account image */}
                        <div className="account-img-box text-center col-4">
                          <Form.Label
                            htmlFor="image-upload"
                            className="image-upload-label"
                          >
                            {imagePreview !== null && (
                              <>
                                <img
                                  src={imagePreview}
                                  className="account-img"
                                  alt="account-image"
                                  style={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "35px",
                                  }}
                                />

                                {imagePreview !== config.defaultImage && (
                                  <button
                                    className="btn btn-danger"
                                    onClick={deleteImage}
                                  >
                                    מחק תמונה
                                  </button>
                                )}
                              </>
                            )}
                            <i
                              className="fas fa-plus-circle add-picture-icon"
                              style={{ width: "100px" }}
                            ></i>
                          </Form.Label>
                          <input
                            type="file"
                            id="image-upload"
                            hidden
                            accept="image/png, image/jpeg"
                            onChange={validateImg}
                          />
                          {/* error show size */}
                          {imgError ? (
                            <Form.Text style={{ color: "red" }}>
                              Image error:{imgError}
                            </Form.Text>
                          ) : null}
                        </div>
                        <hr />
                        {/* FORM */}

                        <Form
                          onSubmit={handleSubmit}
                          className="form-container"
                        >
                          {/* F.NAME & L.NAME */}
                          <Row style={{ marginTop: 20 }}>
                            <Col xl={6} sm={12}>
                              <Form.Label>שם:</Form.Label>
                              <Form.Control
                                className="text-center"
                                type="text"
                                name="firstName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                                placeholder="שם פרטי"
                              />
                              {errors.firstName && touched.firstName ? (
                                <Form.Text style={{ color: "red" }}>
                                  {errors.firstName}
                                </Form.Text>
                              ) : null}
                            </Col>

                            <Col xl={6}>
                              <Form.Label>שם משפחה:</Form.Label>
                              <Form.Control
                                className="text-center"
                                type="text"
                                name="lastName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                                placeholder="שם משפחה"
                              />
                              {errors.lastName && touched.lastName ? (
                                <Form.Text style={{ color: "red" }}>
                                  {errors.lastName}
                                </Form.Text>
                              ) : null}
                            </Col>
                          </Row>
                          {/* EMAIL */}
                          <Row>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>כתובת אימייל שלך:</Form.Label>
                              <Form.Control
                                className="text-center"
                                style={{ width: "100%" }}
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder="נא להכניס מייל"
                              />
                            </Form.Group>

                            <Col md={12}>
                              {errors.email && touched.email ? (
                                <Form.Text style={{ color: "red" }}>
                                  {errors.email}
                                </Form.Text>
                              ) : null}
                            </Col>
                          </Row>

                          {/* PHONE & CITY */}
                          <Row>
                            <Col xl={6}>
                              <Form.Label>טלפון נייד:</Form.Label>
                              <Form.Control
                                className="text-center"
                                type="tel"
                                name="phone"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                                placeholder="טלפון"
                              />
                              {errors.phone && touched.phone ? (
                                <Form.Text style={{ color: "red" }}>
                                  {errors.phone}
                                </Form.Text>
                              ) : null}{" "}
                            </Col>
                            <Col xl={6}>
                              <Form.Label>עיר:</Form.Label>
                              <Form.Control
                                className="text-center"
                                type="text"
                                name="city"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.city}
                                placeholder="עיר"
                              />
                              {errors.city && touched.city ? (
                                <Form.Text style={{ color: "red" }}>
                                  {errors.city}
                                </Form.Text>
                              ) : null}{" "}
                            </Col>
                          </Row>

                          <br />

                          {/* gender & B.DATE */}
                          <Row>
                            <Col>
                              <select
                                className="text-center"
                                aria-label="Default select example"
                                name="gender"
                                id="gender"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.gender}
                              >
                                <option> בחר/י מין </option>
                                <option value="male">זכר</option>
                                <option value="female">נקבה</option>
                                <option value="other">אחר</option>
                              </select>
                              {errors.gender && touched.gender ? (
                                <Form.Text style={{ color: "red" }}>
                                  {errors.gender}
                                </Form.Text>
                              ) : null}
                            </Col>

                            <Col>
                              <input
                                className="text-center"
                                type="date"
                                name="dateBirthDay"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.dateBirthDay}
                                placeholder="תאריך לידה"
                              />
                              {errors.dateBirthDay && touched.dateBirthDay ? (
                                <Form.Text style={{ color: "red" }}>
                                  {errors.dateBirthDay}
                                </Form.Text>
                              ) : null}
                            </Col>
                          </Row>

                          {/* PROFESSION */}
                          <hr />
                          <Row>
                            <Form.Label>אני גם בעל מקצוע:</Form.Label>
                            <Col>
                              <input
                                label="מאלף"
                                type="checkbox"
                                name="dogTrainer"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.dogTrainer}
                                checked={values.dogTrainer}
                              />

                              <Form.Label htmlFor="dogTrainer">מאלף</Form.Label>
                              {errors.dogTrainer && touched.dogTrainer ? (
                                <Form.Text style={{ color: "red" }}>
                                  {errors.dogTrainer}
                                </Form.Text>
                              ) : null}
                            </Col>

                            <Col>
                              <input
                                label="דוגוואקר"
                                type="checkbox"
                                name="dogWalker"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.dogWalker}
                                checked={values.dogWalker}
                              />

                              <Form.Label htmlFor="dogWalker">
                                דוגווקר
                              </Form.Label>
                              {errors.dogWalker && touched.dogWalker ? (
                                <Form.Text style={{ color: "red" }}>
                                  {errors.dogWalker}
                                </Form.Text>
                              ) : null}
                            </Col>
                          </Row>

                          {cookies.data.admin && values.email !== config.admin && (
                            <Row>
                              <Col>
                                <input
                                  label="מנהל"
                                  type="checkbox"
                                  name="admin"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.admin}
                                  checked={values.admin}
                                />
                                <Form.Label>מנהל</Form.Label>
                              </Col>
                            </Row>
                          )}
                          <hr />
                          {/* BUTTON */}

                          <div className="d-grid gap-2">
                            <Button
                              size="lg"
                              style={{ marginTop: 20 }}
                              variant="primary"
                              type="submit"
                              id="regButton"
                              disabled={isSubmitting || imgError}
                            >
                              עדכן
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </Container>
                  )}
                </Formik>
              )}
            </Col>
            <Col className="signUP-1-col" md={9} sm={false}></Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default EditUser;
