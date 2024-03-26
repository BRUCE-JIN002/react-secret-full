import React, { ReactNode, useState } from "react";
import "./index.scss";
import MonthCalendar from "./MonthCalendar";

import dayjs, { Dayjs } from "dayjs";
import Header from "./CalendarHeader";
import LocaleContext from "./LocaleContext";
import classNames from "classnames";

export interface CanlendarProps {
  value: Dayjs;
  style?: React.CSSProperties;
  className?: string;
  /** 定制日期显示， 完全覆盖日期单元格 */
  dateRender?: (date: Dayjs) => ReactNode;
  /** 定制单元格内容，内容会被添加到单元格内， 只有在全屏下才生效 */
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  /** 国际化 */
  locale?: string;
  /** 选择了日期后的回调 */
  onChange?: (date: Dayjs) => void;
}

const Calendar: React.FC<CanlendarProps> = (props) => {
  const { value, style, className, locale, onChange, ...rest } = props;
  const [stateDate, setDate] = useState<Dayjs>(value);
  const [stateCurMoth, setCurMonth] = useState<Dayjs>(value);

  const changeDate = (date: Dayjs) => {
    setDate(date);
    setCurMonth(date);
    onChange?.(date);
  };

  const onSelected = (date: Dayjs) => {
    changeDate(date);
  };
  const preMonthHandler = () => {
    setCurMonth(stateCurMoth.subtract(1, "month"));
  };

  const nextMonthHandler = () => {
    setCurMonth(stateCurMoth.add(1, "month"));
  };

  const todayHandler = () => {
    const today = dayjs(Date.now());
    changeDate(today);
  };

  return (
    <LocaleContext.Provider value={{ locale: locale || navigator.language }}>
      <div className={classNames(className, "calendarContainer")} style={style}>
        <Header
          curMonth={stateCurMoth}
          todayHandler={todayHandler}
          preMonthHandler={preMonthHandler}
          nextMonthHandler={nextMonthHandler}
        />
        <MonthCalendar
          {...rest}
          value={stateDate}
          curMonth={stateCurMoth}
          onSelected={onSelected}
        />
      </div>
    </LocaleContext.Provider>
  );
};

export default Calendar;
