import useCountDown from "../../hooks/useCountDown";

const CountDownDemo = () => {
  const [, formattedRes] = useCountDown({
    targetDate: `${new Date().getFullYear() + 1}-01-01 0:00:00`,
  });

  const { days, hours, minites, seconds } = formattedRes;
  return (
    <p className="text-lg flex flex-wrap justify-center gap-2 leading-loose">
      距离
      <span className="text-blue-600">{new Date().getFullYear() + 1}</span>年
      <span className="text-blue-600">1</span>月
      <span className="text-blue-600">1</span>日
      <span className="flex flex-wrap gap-2">
        还有 {days} 天 {hours} 小时 {minites} 分钟 {seconds} 秒
      </span>
    </p>
  );
};

export default CountDownDemo;
