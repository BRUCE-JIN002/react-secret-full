import dayjs, { Dayjs } from "dayjs";

/** 获取随机颜色 */
export const getRandomColor = () =>
  `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
getRandomColor();

/** 是否是发薪日 */
export const isSalaryDay = (day: Dayjs) => {
  if (day.date() === 10 && day.day() !== 0 && day.day() !== 6) {
    return true;
  } else if (
    day.day() === 5 &&
    (day.date() + 2 === 10 || day.date() + 1 === 10)
  ) {
    return true;
  }
  return false;
};

/** 是否是我的生日 */
export const isMyBorithday = (date: Dayjs) => {
  if (date.date() === 28 && date.month() === 9) {
    return true;
  }
  return false;
};

/** 是否需要巡检 */
export const isRoutingInspection = (date: Dayjs) => {
  if (
    date.format("YYYY-MM-DD") === dayjs(new Date()).format("YYYY-MM-DD") &&
    date.day() !== 6
  ) {
    return true;
  }
  return false;
};

/** 是否是周末 */
export const isWeekends = (date: Dayjs) => {
  if (date.day() === 0 || date.day() === 6) {
    return true;
  }
  return false;
};
