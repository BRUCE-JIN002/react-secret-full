import {
  animated,
  useChain,
  useSpringRef,
  useSprings,
} from "@react-spring/web";
import React from "react";
import "./styles.scss";

const SpringBox3: React.FC = () => {
  const api1 = useSpringRef();
  const [springs] = useSprings(3, () => ({
    ref: api1,
    from: { width: 0 },
    to: { width: 400 },
    config: { duration: 1000 },
  }));

  const api2 = useSpringRef();
  const [springs2] = useSprings(3, () => ({
    ref: api2,
    from: { height: 100 },
    to: { height: 60 },
    config: { duration: 1000 },
  }));

  useChain([api1, api2], [0, 1], 500);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        自定义多个动画执行顺序
      </div>
      {springs.map((styles1, index) => (
        <animated.div
          key={index}
          style={{ ...styles1, ...springs2[index] }}
          className="box3"
        >{`demo-${index + 1}`}</animated.div>
      ))}
    </div>
  );
};

export default SpringBox3;
