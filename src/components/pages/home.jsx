import Category from "./category";
import { useCookies } from "react-cookie";

import { useEffect } from "react";
import userService from "../../services/userService/userService";
const Home = () => {
  return (
    <>
      <div className="center">
        <img
          className="imgCoverDogs mb-4"
          src="./logodog.jpeg"
          alt="dogs pic"
          width="auto"
          height="auto"
        />
      </div>
      <hr />
      <div className="container" id="#home">
        <div className="row text-center">
          <h1 className="display-1 fw-normal">
            פלטפורמה חברתית למציאת בעלי עסקים בתחום הכלבנות
          </h1>
        </div>

        <div className="row text-center mb-5">

          <h2>עולם הכלבנות במקום אחד</h2>
          
          <h4>הפלטפורמה של הולכי על 4</h4>

          <p className="mt-5" >
            אם הגעת עד לכאן סימן שיש סיבה מספיק טובה. "דוגיט" הינה פלטפורמה
            למציאת בעלי עסקים בתחום הכלבנות בישראל, הינה הפלטפורמה היחידה בארץ
            כיום שמנגישה בעלי עסקים מתחומים שונים שמתעסקים אך וקר בתחום הכלבנות.
            תוכלו למצוא אצלנו מאלפים, דוגווקרים, ווטרינרים, מספרות , ואפילו
            פנסיון טוב עם המלצות מגולשים באתר. אז אם בא לך להצטרף לקהילה של
            DOGIT ההולכת וגדלה את/ה מוזמנ/ת להירשם ואפילו לעקוב אחרינו בפייסבוק.
          </p>
          <Category />
        </div>
      </div>
    </>
  );
};

export default Home;
