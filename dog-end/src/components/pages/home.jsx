import Category from "./category";
import { useCookies } from "react-cookie";

import { useEffect } from "react";
import userService from "../../services/userService/userService";
const Home = () => {
  return (
    <div className="container" id="#home">
      <div className="row text-center">
        <h1 className="display-1 fw-normal">Dogit</h1>
      </div>

      <div className="row">
        <p>
          דוגיט הינה פלטפורמה למציאת בעלי עסקים בתחום הכלבנות Dogit היא
          הפלטפורמה הראשונה והיחידה בארץ כיום של נותני שירותים בתחום הכלבנות.
          <p>
            אצלנו תוכלו למצוא מאלפים, דוגווקרים ובעתיד עסקים רבים ומגוונים
            המובילים בתחום הכלבנות.
          </p>
          <p>
            <h3> בעל/ת כלב?! </h3>
            אז בואו תצטרפו לקהילה שלנו ההולכת וגדלה ( מוזמנים לחפש אותנו
            בפייסבוק).
          </p>
          עולם הכלבנות הינו עולם מיוחדים ששייך לחברינו ההולכים על 4, מגיעים להם
          להתפנק ולקבל את הטוב ביותר. אז מה לא תשקיעו??
          <p>יאללה תירשמו ותעשו לייק.
            <p> בואו להנות משלל שירותים. </p></p>
        </p>
      </div>

      <Category />
      <br />
    </div>
  );
};

export default Home;
