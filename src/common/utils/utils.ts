import dayjs, { Dayjs } from "dayjs";

/** 获取随机颜色 */
export const getRandomColor = () =>
  `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
getRandomColor();

/** 是否是发薪日 */
export const isPayDay = (day: Dayjs) => {
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
export const isMyBirthday = (date: Dayjs) => {
  if (date.date() === 28 && date.month() === 9) {
    return true;
  }
  return false;
};

/** 学习提示 */
export const isStudyDay = (date: Dayjs) => {
  return date.isSame(dayjs(), "day");
};

/** 是否是周末 */
export const isWeekends = (date: Dayjs) => {
  if (date.day() === 0 || date.day() === 6) {
    return true;
  }
  return false;
};

/** 对象数组去重 */
export const uniqObjArr = (arr: any[], field: string | number) =>
  arr.reduce((acc, cur) => {
    if (!acc.find((item: any) => item[field] === cur[field])) {
      acc.push(cur);
    }
    return acc;
  }, []);
