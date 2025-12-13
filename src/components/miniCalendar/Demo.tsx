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
    <div style={{ display: "flex", gap: 50 }}>
      <div className="flex flex-col items-center gap-4">
        <h1>受控组件：</h1>
        <MiniCalendar
          value={new Date()}
          onChange={(date) => {
            console.log("日期:", date.toLocaleDateString());
          }}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <h1>非受控组件：</h1>
        <MiniCalendar ref={canlendarRef} value={new Date()} />
      </div>
    </div>
  );
};

export default MinCalendarDemo;
