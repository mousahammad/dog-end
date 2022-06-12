import React, { useState, useEffect } from "react";

import { Formik } from "formik";
import TempInput from "./TempInput";

const Meets = ({ setDays, days }) => {
  const [sun, setSun] = useState(days.sun);
  const [mon, setMon] = useState(days.mon);
  const [tues, setTues] = useState(days.tues);
  const [wen, setWen] = useState(days.wen);
  const [turs, setTurs] = useState(days.turs);
  const [fri, setFri] = useState(days.fri);
  const [sat, setSat] = useState(days.sat);

  useEffect(() => {
    console.log(days);
    setDays({ sun, mon, tues, wen, turs, fri, sat });
  }, [sun, mon, tues, wen, turs, fri, sat]);

  return (
    <div className="d-flex flex-column textSizeSelect">
      
      <label>ראשון:</label> <TempInput setDay={setSun} day={sun} />
      <label>שני:</label> <TempInput setDay={setMon} day={mon} />
      <label>שלישי:</label> <TempInput setDay={setTues} day={tues} />
      <label>רביעי:</label> <TempInput setDay={setWen} day={wen} />
      <label>חמישי:</label> <TempInput setDay={setTurs} day={turs} />
      <label>שישי:</label> <TempInput setDay={setFri} day={fri} />
      <label>שבת:</label> <TempInput setDay={setSat} day={sat} />
    </div>
  );
};

export default Meets;
