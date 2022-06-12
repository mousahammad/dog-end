import React, { useState, useEffect } from "react";
import { Formik } from "formik";
// import "./createCardWalker.css";
import Meets from "../clockMeet/Meets";
import cardService from "../../services/dogWalker/cardServiceDogWalker";
import commonService from "../../services/commonService";

function CreateCardWalker() {
  const [days, setDays] = useState({
    sun: { start: "", end: "", closed: true },
    mon: { start: "", end: "", closed: true },
    tues: { start: "", end: "", closed: true },
    wen: { start: "", end: "", closed: true },
    turs: { start: "", end: "", closed: true },
    fri: { start: "", end: "", closed: true },
    sat: { start: "", end: "", closed: true },
  });

  const [errorServ, setErrorServ] = useState("");
  const [errorDay, setErrorDay] = useState("");

  const tagsToArray = (myTags) => {
    let myArr = [];
    if (!myTags) {
      return [];
    }

    let arr = myTags.split(",");

    for (let val of arr) {
      if (val != "" && val != null) {
        myArr.push(val);
      }
    }
    return myArr;
  };

  return (
    <Formik
      initialValues={{
        experience: "",
        timeWalker: "",
        cost: "",
        tags: "",
      }}
      validate={(values) => {
        const errors = {};

        if (!values.experience) {
          errors.experience = "Required";
        } else if (values.experience < 0 || values.experience > 100) {
          errors.experience = "Invalid experience";
        }
        if (!values.cost) {
          errors.cost = "Required";
        }
        // validation for timeWalker
        if (!values.timeWalker) {
          errors.timeWalker = "Required";
        }

        return errors;
      }}
      //pic validation
      onSubmit={async (values) => {
        try {
          setErrorServ("");
          setErrorDay("");
          let err = commonService.validateDays(days);

          if (err) {
            setErrorDay(err);
            return;
          }
          await cardService.createCard({
            experience: values.experience,
            timeWalker: values.timeWalker,
            cost: values.cost,
            tags: tagsToArray(values.tags),
            meets: days,
          });
          window.location = "/profile";
        } catch ({ response }) {
          setErrorServ(response.data);
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
        // form inputs
        <div className="container ">
          <form onSubmit={handleSubmit} className="form-container">
            <label htmlFor="experience" className="experience">
              ניסיון בשנים
            </label>
            <br />
            <input
              className="textSizeSelect"
              type="number"
              name="experience"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.experience}
              placeholder="ניסיון בשנים"
            />
            {errors.experience && touched.experience ? (
              <div>{errors.experience}</div>
            ) : null}
            <br /><br />
            <label htmlFor="timeWalker">משך זמן טיול</label>
            <br />
            <select
              className="textSizeSelect"
              name="timeWalker"
              id="timeWalker"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.timeWalker}
            >
              <option value="">בחר/י</option>
              <option value="15">15 דק</option>
              <option value="20">20 דק</option>
              <option value="25">25 דק</option>
              <option value="30">30 דק</option>
              <option value="35">35 דק</option>
              <option value="40">40 דק</option>
              <option value="45">45 דק</option>
              <option value="50">50 דק</option>
              <option value="55">55 דק</option>
              <option value="60">60 דק</option>
            </select>
            {errors.timeWalker && touched.timeWalker ? (
              <div>{errors.timeWalker}</div>
            ) : null}
            <br />
            <br />

            <label htmlFor="cost">עלות מפגש:</label>
            <br />
            <select
              name="cost"
              id="cost"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.cost}
            >
              <option value="">בחר/י</option>
              <option value="150 - 250">150 - 250</option>
              <option value="250 - 350">250 - 350</option>
              <option value="450+">450+</option>
            </select>
            {errors.cost && touched.cost ? <div>{errors.cost}</div> : null}
            <br />
            <br />

            <label className="Tags">תגיות חיפוש:</label>
            <br />
            <input
              className="tagsInput"
              type="text"
              name="tags"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.tags}
            />
            {errors.tags && touched.tags ? <div>{errors.tags}</div> : null}

            <br />
            <br />
            <Meets setDays={setDays} days={days} />
            <br />
            {errorDay && <div className="text-danger">{errorDay}</div>}

            <br />
            <br />
            <button
              className="submit"
              type="submit"
              id="regButton"
              disabled={isSubmitting}
            >
              רישום כרטיס
            </button>
            {errorServ && <div className="text-danger">{errorServ}</div>}
          </form>
        </div>
      )}
    </Formik>
  );
}

export default CreateCardWalker;
