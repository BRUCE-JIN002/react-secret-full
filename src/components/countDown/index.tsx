import useCountDown from "../../hooks/useCountDown";

const CountDemo = () => {
  const [, formattedRes] = useCountDown({
    targetDate: `${new Date().getFullYear()}-06-30 23:59:59`,
  });

  const { days, hours, minites, seconds } = formattedRes;
  return (
    <p className="text-xl flex">
      距离<span className="text-[red]">7</span>月
      <span className="text-[red]">1</span>日
      <span className="flex gap-5 min-w-[295px]">
        还有 {days} 天 {hours} 小时 {minites} 分钟 {seconds} 秒
      </span>
    </p>
  );
};

export default CountDemo;
