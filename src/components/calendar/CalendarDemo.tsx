import { GiftFilled } from "@ant-design/icons";
import { Badge, FloatButton } from "antd";
import React, { useState } from "react";
import {
  isMyBorithday,
  isRoutingInspection,
  isSalaryDay,
  isWeekends,
} from "../../common/utils";
import dayjs, { Dayjs } from "dayjs";
import Calendar from "./Calendar";
import { useToggle } from "ahooks";

export const enum LocaleType {
  CN = "zh-CN",
  EN = "en-US",
}

const CalendarDemo: React.FC = (props) => {
  const [stateLocale, setLocale] = useToggle(LocaleType.CN, LocaleType.EN);
  const [stateDate, setDate] = useState<Dayjs>(dayjs(new Date()));

  return (
    <>
      <Calendar
        value={stateDate}
        locale={stateLocale}
        onChange={(value) => {
          setDate(value);
        }}
        dateInnerContent={(date) => {
          return (
            <div
              style={{
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {isRoutingInspection(date) && (
                <div>
                  <Badge
                    color={"red"}
                    status="processing"
                    text={
                      <span style={{ color: "#f50", fontSize: 12 }}>
                        今天巡检了吗？
                      </span>
                    }
                    style={{ fontSize: 12 }}
                  />
                </div>
              )}
              {isSalaryDay(date) && (
                <div>
                  <Badge
                    color={"orange"}
                    text={<span style={{ color: "orange" }}>发薪日</span>}
                  />
                </div>
              )}
              {isWeekends(date) && (
                <div>
                  <Badge
                    color={"green"}
                    text={<span style={{ color: "yellowgreen" }}>休</span>}
                  />
                </div>
              )}
              {isMyBorithday(date) && (
                <div style={{ color: "magenta", marginTop: 5 }}>
                  <GiftFilled />
                  <span style={{ fontSize: 12, marginLeft: 3 }}>
                    金显祥的生日
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
