import useCountDown from "../../hooks/useCountDown";

const CountDemo = () => {
  const [, formattedRes] = useCountDown({
    targetDate: `${new Date().getFullYear()}-06-30 23:59:59`,
  });

  const { days, hours, minites, seconds } = formattedRes;
  return (
    <p className="text-xl">
      距离<span className="text-[red]">7</span>月
      <span className="text-[red]">1</span>日还有 {days} 天 {hours} 小时{" "}
      {minites} 分钟 {seconds} 秒
    </p>
  );
};

export default CountDemo;
