import dayjs, { Dayjs } from "dayjs";
import React, { useContext } from "react";
import LocaleContext from "./LocaleContext";
import allLocales from "./locale";
import { Button } from "antd";

interface HeaderProps {
  curMonth: Dayjs;
  preMonthHandler: () => void;
  nextMonthHandler: () => void;
  todayHandler: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { curMonth, preMonthHandler, nextMonthHandler, todayHandler } = props;

  const localeContext = useContext(LocaleContext);
  const CalendarContext = allLocales[localeContext.locale];

  const daysFromCurrent = Math.floor(
    (new Date(curMonth.format("YYYY-MM-DD")).getTime() -
      new Date(dayjs().format("YYYY-MM-DD")).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="calendar-header">
      <div className="calendar-header-left">
        <div className="calendar-header-icon" onClick={preMonthHandler}>
          &lt;
        </div>
        <div className="calendar-header-value">
          {curMonth.format(CalendarContext.formatMonth)}
        </div>
        <div className="calendar-header-icon" onClick={nextMonthHandler}>
          &gt;
        </div>
        <Button type="primary" onClick={todayHandler}>
          {CalendarContext.today}
        </Button>
      </div>
      <div>
        {daysFromCurrent !== 0
          ? daysFromCurrent >= 0
            ? `${daysFromCurrent} ${
                daysFromCurrent === 1
                  ? CalendarContext.oneAfter
                  : CalendarContext.after
              }`
            : `${daysFromCurrent * -1} ${
                daysFromCurrent === 1
                  ? CalendarContext.oneAgo
                  : CalendarContext.ago
              }`
          : null}
      </div>
    </div>
  );
};

export default Header;
