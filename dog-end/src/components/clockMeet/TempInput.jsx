import React, { useState, useEffect } from "react";

import { Formik } from "formik";

const createTime = () => {
  let html = "";

  for (let i = 7; i < 19; i++) {
    html += `<option value=${i}>${i}:00</option>`;
  }

  return html;
};
const TempInput = ({ setDay, day }) => {
  const [chk, setChk] = useState(day.closed);

  return (
    <Formik
      initialValues={
        {
          start: day.start,
          end: day.end,
          closed: day.closed,
        } || { start: day.start, end: day.end, closed: day.closed }
      }
      enableReinitialize
      validate={(values) => {
        const errors = {};

        if (values.closed) {
          values.start = "";
          values.end = "";
          setChk(true);
        } else {
          setChk(false);
          if (!values.start) {
            errors.start = "שעת התחלה הינה שדה חובה";
          }
          if (!values.end) {
            errors.end = "שעת סיום הינה שדה חובה";
          }
          if (Number(values.start) >= Number(values.end)) {
            errors.start = "שעת התחלה חייבת להיות קטנה משעת סגירה";
          }
          if (Number(values.end) <= Number(values.start)) {
            errors.end = "שעת הסגירה חייבת להיות גדולה משעת התחלה";
          }
        }

        setDay(values);

        return errors;
      }}
      //pic validation
      onSubmit={async (e, values) => {
        try {
        } catch (e) {}
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
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between ">
            <div className="row col-4 d-flex">
              <label>"שעת התחלה:"</label>

              <select
                name="start"
                disabled={chk}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.start}
              >
                <option value="">בחר/י</option>
                <option value="7">7:00</option>
                <option value="8">8:00</option>
                <option value="9">9:00</option>
                <option value="10">10:00</option>
                <option value="11">11:00</option>
                <option value="12">12:00</option>
                <option value="13">13:00</option>
                <option value="14">14:00</option>
                <option value="15">15:00</option>
                <option value="16">16:00</option>
                <option value="17">17:00</option>
                <option value="18">18:00</option>
                <option value="19">19:00</option>
              </select>
            </div>

            <div className="row col-4 d-flex">
              <label>"שעת סיום:"</label>

              <select
                name="end"
                disabled={chk}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.end}
              >
                <option value="">בחר/י</option>
                <option value="7">7:00</option>
                <option value="8">8:00</option>
                <option value="9">9:00</option>
                <option value="10">10:00</option>
                <option value="11">11:00</option>
                <option value="12">12:00</option>
                <option value="13">13:00</option>
                <option value="14">14:00</option>
                <option value="15">15:00</option>
                <option value="16">16:00</option>
                <option value="17">17:00</option>
                <option value="18">18:00</option>
                <option value="19">19:00</option>
              </select>
            </div>

            <div className="row m-3">
              <label className="text-center">"סגור"</label>
              <input
                type="checkbox"
                name="closed"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.closed}
                checked={values.closed}
              />
            </div>
          </div>
          {errors.start && touched.start ? (
            <div className="text-danger">{errors.start}</div>
          ) : null}
          {errors.end && touched.end ? (
            <div className="text-danger">{errors.end}</div>
          ) : null}
          <div className="text-warning">
            {values.closed
              ? "סגור"
              : values.start && values.end && !errors.start && !errors.end
              ? `שעת התחלה שלך היא ${values.start} שעת הסיום שלך היא ${values.end}`
              : null}
          </div>
        </div>
      )}
    </Formik>
  );
};

export default TempInput;
