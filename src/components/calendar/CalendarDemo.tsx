import { DollarOutlined, GiftFilled } from "@ant-design/icons";
import { Badge, FloatButton } from "antd";
import React, { useState } from "react";
import {
  isMyBorithday,
  isStudyDay,
  isPayDay,
  isWeekends
} from "../../common/utils/utils";
import dayjs, { Dayjs } from "dayjs";
import Calendar from "./Calendar";
import { useToggle } from "ahooks";
import allLocales from "./locale";

export const enum LocaleType {
  CN = "zh-CN",
  EN = "en-US"
}

const CalendarDemo: React.FC = (props) => {
  const [stateLocale, setLocale] = useToggle(LocaleType.CN, LocaleType.EN);
  const [stateDate, setDate] = useState<Dayjs>(dayjs(new Date()));
  const calendarLocales = allLocales[stateLocale];

  return (
    <>
      <Calendar
        value={stateDate}
        locale={stateLocale}
        onChange={(value) => setDate(value)}
        dateInnerContent={(date) => {
          return (
            <div
              style={{
                fontSize: 12,
                fontWeight: "bold"
              }}
            >
              {isWeekends(date) && (
                <div>
                  <Badge
                    color="green"
                    text={
                      <span style={{ color: "yellowgreen", fontSize: 10 }}>
                        {calendarLocales.selfCustomized.dayoff}
                      </span>
                    }
                  />
                </div>
              )}
              {isStudyDay(date) && (
                <div>
                  <Badge
                    color="red"
                    status="processing"
                    text={
                      <span style={{ color: "#f50", fontSize: 10 }}>
                        {calendarLocales.selfCustomized.studyday}
                      </span>
                    }
                  />
                </div>
              )}
              {isPayDay(date) && (
                <div>
                  <div style={{ color: "orange", marginTop: 5 }}>
                    <DollarOutlined />
                    <span style={{ fontSize: 10, marginLeft: 3 }}>
                      {calendarLocales.selfCustomized.payday}
                    </span>
                  </div>
                </div>
              )}
              {isMyBorithday(date) && (
                <div style={{ color: "magenta", marginTop: 5 }}>
                  <GiftFilled />
                  <span style={{ fontSize: 10, marginLeft: 3 }}>
                    {calendarLocales.selfCustomized.birthday}
                  </span>
                </div>
              )}
            </div>
          );
        }}
      />
      <FloatButton
        type="primary"
        onClick={() => setLocale.toggle()}
        description={stateLocale === LocaleType.CN ? "英文" : "CN"}
      />
    </>
  );
};

export default CalendarDemo;
