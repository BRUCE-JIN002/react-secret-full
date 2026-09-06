import React, { useRef, useState } from "react";
import MiniCalendar, { CalendarRef } from "./MinCalendar";
import "./index.scss";
const MinCalendarDemo: React.FC = () => {
  const calendarRef = useRef<CalendarRef>(null);
  const [selected, setSelected] = useState(new Date());
  return <div className="mini-calendar-examples">
    <section className="calendar-example">
      <h3>日期选择</h3>
      <p>点击日期，通过回调获取选择结果。</p>
      <MiniCalendar value={selected} onChange={setSelected} />
      <div className="calendar-caption">
        <span className="status-dot" />已选择 {selected.toLocaleDateString("zh-CN")}</div>
    </section>
    <section className="calendar-example">
      <h3>实例方法</h3>
      <p>通过 ref 操作日历，快速回到当前日期。</p>
      <MiniCalendar ref={calendarRef} />
      <div className="calendar-caption">
        <button onClick={() => calendarRef.current?.setDate(new Date())}>回到今天 →</button>
      </div>
    </section>
  </div>;
};
export default MinCalendarDemo;
