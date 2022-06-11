import userService from "../../../services/userService/userService";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { Formik } from "formik";
// import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import "./signUp.css";
import config from "../../../config.json";

const SignUp = () => {
  const navigate = useNavigate();

  //image upload states
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false); //dont upload image by default
  const [imagePreview, setImagePreview] = useState(config.defaultImage);

  const [imgError, setImgError] = useState("");
  // const regButton = document.getElementById("regButton");

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

  //cloudinary
  // async function uploadImage() {
  //   const data = new FormData();
  //   if (!image) {
  //     return "";
  //   }
  //   data.append("file", image);
  //   data.append("upload_preset", "myUploadPreset");
  //   try {
  //     setUploadingImg(true);
  //     let res = await fetch(
  //       "https://api.cloudinary.com/v1_1/antoncloudinary/image/upload",
  //       {
  //         method: "post",
  //         body: data,
  //       }
  //     );
  //     const urlData = await res.json();
  //     setUploadingImg(false);
  //     console.log(urlData);
  //     return urlData.url;
  //   } catch (error) {
  //     setUploadingImg(false);
  //     console.log(error);
  //   }
  // }

  return (
    <Container>
      <h1 className="text-center m-0">נא להירשם על מנת להיות חלק מהקהילה</h1>
      <Row className="signUp-row">
        <Col className="signUP-1-col" md={8} sm={false}></Col>
        <Col className="signUP-2-col">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              city: "",
              password: "",
              gender: "",
              dateBirthDay: "",
              admin: false,
              dogTrainer: false,
              dogWalker: false,
              phone: "",
              image: false,
            }}
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
              } else if (!/^[a-zA-Z א-ת]*$/i.test(values.lastName))
                errors.lastName = "Your lastName is Invalid";

              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
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
              } else if (values.city.length < 2 || values.city.length > 400) {
                errors.city = "Invalid city";
              } else if (/^[0-9]*$/i.test(values.city))
                errors.city = "Your city is Invalid";

              if (!values.password) {
                errors.password = "Required";
              } else if (
                values.password.length < 6 ||
                values.password.length > 255
              ) {
                errors.password = "Invalid password";
              }
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
                }

                const data = {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  city: values.city,
                  password: values.password,
                  gender: values.gender,
                  dateBirthDay: values.dateBirthDay,
                  admin: values.admin,
                  dogTrainer: values.dogTrainer,
                  dogWalker: values.dogWalker,
                  phone: values.phone,
                  image: values.image,
                };

                let user = await userService.createUser(data);

                if (values.image) {
                  let frmData = new FormData();
                  frmData.append("name", user.data._id + ".jpg");
                  frmData.append("image", image);

                  await userService.saveImage(frmData);
                }
                navigate(`/login`);
              } catch ({ response }) {
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
              /* and other goodies */
            }) => (
              <Container style={{ width: "100%" }}>
                <div>
                  {/* account image */}
                  <div className="account-img-box">
                    <Form.Label
                      htmlFor="image-upload"
                      className="image-upload-label"
                    >
                      <img
                        src={imagePreview}
                        className="account-img"
                        alt="me"
                        style={{
                          width: "200px",
                          height: "130px",
                          borderRadius: 25,
                        }}
                      />
                      <i className="fas fa-plus-circle add-picture-icon"></i>
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
                        {" "}
                        Image error:{imgError}
                      </Form.Text>
                    ) : null}
                  </div>
                  <hr />
                  {/* FORM */}

                  <Form onSubmit={handleSubmit} className="form-container">
                    {/* F.NAME & L.NAME */}
                    <Row style={{ marginTop: 20 }}>
                      <Col xl={6} sm={12}>
                        <Form.Label>:שם</Form.Label>
                        <Form.Control
                          className="text-center"
                          type="text"
                          name="firstName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstName}
                          placeholder="First name"
                        />
                        {errors.firstName && touched.firstName ? (
                          <Form.Text style={{ color: "red" }}>
                            {errors.firstName}
                          </Form.Text>
                        ) : null}
                      </Col>

                      <Col xl={6}>
                        <Form.Label>:שם משפחה</Form.Label>
                        <Form.Control
                          className="text-center"
                          type="text"
                          name="lastName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastName}
                          placeholder="Last name"
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
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>:כתובת אימייל שלך</Form.Label>
                        <Form.Control
                          className="text-center"
                          style={{ width: "100%" }}
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          placeholder="your-email@mail.com"
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
                        <Form.Label>:טלפון נייד</Form.Label>
                        <Form.Control
                          className="text-center"
                          type="tel"
                          name="phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                          placeholder="Phone"
                        />
                        {errors.phone && touched.phone ? (
                          <Form.Text style={{ color: "red" }}>
                            {errors.phone}
                          </Form.Text>
                        ) : null}{" "}
                      </Col>
                      <Col xl={6}>
                        <Form.Label>:עיר</Form.Label>
                        <Form.Control
                          className="text-center"
                          type="text"
                          name="city"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.city}
                          placeholder="City"
                        />
                        {errors.city && touched.city ? (
                          <Form.Text style={{ color: "red" }}>
                            {errors.city}
                          </Form.Text>
                        ) : null}{" "}
                      </Col>
                    </Row>

                    <br />

                    {/* SEX & B.DATE */}
                    <Row>
                      <Col>
                        {/* <Form.Label htmlFor="gender">מין:</Form.Label> */}
                        <Form.Select
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
                        </Form.Select>
                        {errors.gender && touched.gender ? (
                          <Form.Text style={{ color: "red" }}>
                            {errors.gender}
                          </Form.Text>
                        ) : null}
                      </Col>

                      <Col>
                        <Form.Control
                          className="text-center"
                          type="date"
                          name="dateBirthDay"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.dateBirthDay}
                          placeholder="date BirthDay"
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
                      <Form.Label>:אני גם בעל מקצוע</Form.Label>
                      <Col>
                        <Form.Check
                          label="מאלף"
                          type="checkbox"
                          name="dogTrainer"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.dogTrainer}
                        />

                        {/* <Form.Label htmlFor="dogTrainer">מאלף</Form.Label> */}
                        {errors.dogTrainer && touched.dogTrainer ? (
                          <Form.Text style={{ color: "red" }}>
                            {errors.dogTrainer}
                          </Form.Text>
                        ) : null}
                      </Col>

                      <Col>
                        <Form.Check
                          label="דוגוואקר"
                          type="checkbox"
                          name="dogWalker"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.dogWalker}
                        />

                        {/* <Form.Label htmlFor="dogWalker">דוגווקר</Form.Label> */}
                        {errors.dogWalker && touched.dogWalker ? (
                          <Form.Text style={{ color: "red" }}>
                            {errors.dogWalker}
                          </Form.Text>
                        ) : null}
                      </Col>
                    </Row>
                    <hr />
                    {/* PASSWORD */}
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>:סיסמה</Form.Label>
                      <Form.Control
                        className="text-center"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Password"
                      />
                    </Form.Group>

                    {errors.password && touched.password ? (
                      <Form.Text style={{ color: "red" }}>
                        {errors.password}
                      </Form.Text>
                    ) : null}
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
                        הרשמה
                      </Button>
                    </div>
                  </Form>
                </div>
              </Container>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
