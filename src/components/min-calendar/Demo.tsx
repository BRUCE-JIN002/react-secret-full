import React, { useEffect, useRef } from "react";
import MiniCalendar, { CalendarRef } from "./MinCalendar";
import "./index.scss";

const MinCalendarDemo: React.FC = () => {
  const canlendarRef = useRef<CalendarRef>(null);

  useEffect(() => {
    const date = canlendarRef.current?.getDate().toLocaleDateString();
    console.log("useImperativeHandle", date);

    const timer = setTimeout(() => {
      canlendarRef.current?.setDate(new Date());
    });

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <p>受控组件：</p>
      <MiniCalendar
        value={new Date()}
        onChange={(date) => {
          console.log("日期:", date.toLocaleDateString());
        }}
      />
      <p>非受控组件：</p>
      <MiniCalendar ref={canlendarRef} value={new Date()} />
    </div>
  );
};

export default MinCalendarDemo;
