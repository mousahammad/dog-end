export function arrayToTags(arr) {
  if (arr.length === 0) {
    return "";
  }

  return arr.join(",");
}
// array to buttons
// export function arrayToTagsButtons(arr) {
//   if (arr.length === 0) {
//     return "";
//   }

//   return arr.join(",");
// }

export const tagsToArray = (myTags) => {
  let myArr = [];
  if (myTags === "" || myTags == null) {
    return [];
  }

  let arr = myTags.split(",");

  for (let val of arr) {
    if (val !== "" && val != null) {
      let tmp = myArr.indexOf(val);
      if (tmp === -1) {
        myArr.push(val);
      }
    }
  }
  return myArr;
};

export const validateDays = (days) => {
  for (let day in days) {
    if (!days[day].closed) {
      if (!days[day].start) {
        let d = nameDayToHebrew(day);
        return `חייב להכניס שעת התחלה עבור יום ${d}`;
      } else if (!days[day].end) {
        let d = nameDayToHebrew(day);
        return `חייב להכניס שעת סיום עבור יום ${d}`;
      } else if (Number(days[day].start) >= Number(days[day].end)) {
        let d = nameDayToHebrew(day);
        return `שעת התחלה חייבת להיות קטנה משעת סיום עבור יום ${d}`;
      }
    }
  }

  return "";
};

export const nameDayToHebrew = (day) => {
  if (!day || day == null || day === "") {
    return "";
  }

  switch (day) {
    case "sun":
      return "ראשון";

    case "mon":
      return "שני";

    case "tues":
      return "שלישי";

    case "wen":
      return "רביעי";

    case "turs":
      return "חמישי";

    case "fri":
      return "שישי";

    case "sat":
      return "שבת";

    default:
      return "";
  }
};

const service = {
  arrayToTags,
  tagsToArray,
  validateDays,
  nameDayToHebrew,
};

export default service;
