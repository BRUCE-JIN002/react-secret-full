import React, { useContext } from "react";
import { CanlendarProps } from "./Calendar";
import dayjs, { Dayjs } from "dayjs";
import LocaleContext from "./LocaleContext";
import allLocales from "./locale";
import classNames from "classnames";

const weekList = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

type DaysInfo = Array<{ date: Dayjs; currentMonth: boolean }>;

const getAllDays = (date: Dayjs) => {
  const startDate = date.startOf("month");
  const day = startDate.day();

  const daysInfo: DaysInfo = new Array(6 * 7);

  for (let i = 0; i <= day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, "day"),
      currentMonth: false,
    };
  }

  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.subtract(day - i, "day");
    daysInfo[i] = {
      date: calcDate,
      currentMonth: calcDate.month() === date.month(),
    };
  }

  return daysInfo;
};

interface MonthCalendarProps extends CanlendarProps {
  onSelected?: (date: Dayjs) => void;
  curMonth: Dayjs;
}

const MonthCalendar: React.FC<MonthCalendarProps> = (props) => {
  const { value, curMonth, dateRender, dateInnerContent, onSelected } = props;
  const localeContext = useContext(LocaleContext);
  const CalendarLocale = allLocales[localeContext.locale];

  const allDays = getAllDays(curMonth);

  const renderDays = (days: DaysInfo) => {
    const rows: JSX.Element[][] = [];
    for (let i = 0; i < 6; i++) {
      const row: JSX.Element[] = [];
      for (let j = 0; j < 7; j++) {
        const item = days[i * 7 + j];
        row[j] = (
          <div
            key={i + j}
            className={classNames(
              "calendar-month-body-cell",
              item.currentMonth ? "calendar-month-body-cell-current" : ""
            )}
            onClick={() => onSelected?.(item.date)}
          >
            {dateRender ? (
              dateRender(item.date)
            ) : (
              <div className="calendar-month-body-cell-date">
                <div
                  className={classNames(
                    "calendar-month-body-cell-date-value",
                    {
                      "calendar-month-body-cell-date-selected":
                        value.format("YYYY-MM-DD") ===
                        item.date.format("YYYY-MM-DD"),
                    },
                    {
                      "calendar-month-body-cell-date-today":
                        (dayjs(new Date()).format("YYYY-MM-DD") ===
                          item.date.format("YYYY-MM-DD") &&
                          value.format("YYYY-MM-DD") !==
                            item.date.format("YYYY-MM-DD")) ||
                        (dayjs(new Date()).format("DD") ===
                          item.date.format("DD") &&
                          value.format("MM") !== item.date.format("MM")),
                    }
                  )}
                >
                  {item.date.date()}
                </div>
                <div className="calendar-month-body-cell-date-content">
                  {dateInnerContent?.(item.date)}
                </div>
              </div>
            )}
          </div>
        );
      }
      rows.push(row);
    }
    return rows.map((row, index) => (
      <div className="calendar-month-body-row" key={index}>
        {row}
      </div>
    ));
  };

  return (
    <div className="calendar-month">
      <div className="calendar-month-week-list">
        {weekList.map((week) => (
          <div className="calendar-month-week-list-item" key={week}>
            {CalendarLocale.week[week]}
          </div>
        ))}
      </div>
      <div className="calendar-month-body">{renderDays(allDays)}</div>
    </div>
  );
};

export default MonthCalendar;
