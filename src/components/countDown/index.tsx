import useCountDown from "../../hooks/useCountDown";

const CountDemo = () => {
  const [, formattedRes] = useCountDown({
    targetDate: `${new Date().getFullYear()}-08-01 0:00:00`,
  });

  const { days, hours, minites, seconds } = formattedRes;
  return (
    <p className="text-3xl flex">
      距离<span className="text-[red]">8</span>月
      <span className="text-[red]">1</span>日
      <span className="flex gap-5 min-w-[295px]">
        还有 {days} 天 {hours} 小时 {minites} 分钟 {seconds} 秒
      </span>
    </p>
  );
};

export default CountDemo;
