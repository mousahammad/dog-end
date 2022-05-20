import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import "./createCardWalker.css";
import Meets from "../clockMeet/Meets";
import cardService from "../../services/dogWalker/cardServiceDogWalker";
import commonService from "../../services/commonService";
import { useParams } from "react-router-dom";

function EditCardWalker({ cardId }) {
  const params = useParams();
  let val = cardId ? cardId : params.id;
  const [days, setDays] = useState("");
  const [errorDay, setErrorDay] = useState("");
  const [load, setLoad] = useState(true);
  const [errorServ, setErrorServ] = useState("");
  const [card, setCard] = useState("");

  const getData = async () => {
    try {
      setLoad(true);
      val = await cardService.getCard(val);
      setCard(val.data[0]);

      setDays(val.data[0].meets);

      setLoad(false);
      // console.log(card);
    } catch (err) {}
  };

  useEffect(() => {
    getData();
  }, []);

  if (load) {
    return <h1>Loading ..</h1>;
  }

  return (
    <>
      {card && (
        <Formik
          initialValues={
            {
              experience: card?.experience,
              timeWalker: card?.timeWalker,
              cost: card?.cost,
              tags: commonService.arrayToTags(card?.tags),
            } || {
              experience: "",
              timeWalker: "",
              cost: "",
              tags: "",
            }
          }
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

              await cardService.editCard(val, {
                experience: values.experience,
                timeWalker: values.timeWalker,
                cost: values.cost,
                tags: commonService.tagsToArray(values.tags),
                meets: days,
              });

              window.location = "/profile";
            } catch ({ response }) {
              setErrorServ(response.data);
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
          }) => (
            // form inputs
            <div className="container ">
              <form onSubmit={handleSubmit} className="form-container">
                <label htmlFor="experience">ניסיון בשנים</label>

                <input
                  type="number"
                  name="experience"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.experience}
                  placeholder="experience"
                />
                {errors.experience && touched.experience ? (
                  <div>{errors.experience}</div>
                ) : null}

                <br />
                {days && <Meets setDays={setDays} days={days} />}
                {errorDay && <div className="text-danger">{errorDay}</div>}

                <label htmlFor="timeWalker">משך זמן טיול</label>
                <select
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

                <label>טאגז</label>
                <input
                  type="text"
                  name="tags"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.tags}
                />
                {errors.tags && touched.tags ? <div>{errors.tags}</div> : null}

                <br />
                <br />
                <button type="submit" id="regButton" disabled={isSubmitting}>
                  עדכון כרטיס
                </button>
                {errorServ && <div className="text-danger">{errorServ}</div>}
              </form>
            </div>
          )}
        </Formik>
      )}
    </>
  );
}

export default EditCardWalker;