import { animated, useSprings, useTrail } from "@react-spring/web";
import React, { useEffect } from "react";
import "./styles.scss";
import Space from "../../../components/space/Space";

const SpringBox2: React.FC = () => {
  const [springs, api] = useSprings(3, () => ({
    from: { width: 0 },
    //当指定了 to，那会立刻执行动画，或者不指定 to，用 api.start 来开始动画
    // to: { width: 300 },
    config: { duration: 1000 },
  }));

  const [springs2, api2] = useTrail(3, () => ({
    from: { width: 0 },
    config: { duration: 1000 },
  }));

  useEffect(() => {
    api.start({ width: 400 });
    api2.start({ width: 400 });
  }, [api, api2]);

  return (
    <div className="wrapper">
      <Space direction="vertical" size={10}>
        <div className="title">同时执行</div>
        {springs.map((style, index) => (
          <animated.div className="box2" style={style} key={index}>
            {`Demo1-${index + 1}`}
          </animated.div>
        ))}
      </Space>
      <Space direction="vertical" size={10}>
        <div className="title">依次执行</div>
        {springs2.map((style, index) => (
          <animated.div className="box2" style={style} key={index}>
            {`Demo2-${index + 1}`}
          </animated.div>
        ))}
      </Space>
    </div>
  );
};

export default SpringBox2;
