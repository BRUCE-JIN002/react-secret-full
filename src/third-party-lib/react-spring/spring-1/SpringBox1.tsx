import { animated, useSpring, useSpringValue } from "@react-spring/web";
import React, { useEffect } from "react";
import "./styles.scss";
import Space from "../../../components/space/Space";

const SpringBox1: React.FC = () => {
  //通过配置实现弹簧动画，返回样式
  const width = useSpringValue(0, {
    config: {
      mass: 2,
      friction: 10,
      tension: 200,
    },
  });

  //通过useSpring配置实现动画，直接返回样式
  const styles = useSpring({
    from: {
      width: 0,
      height: 0,
    },
    to: {
      width: 400,
      height: 80,
    },
    config: {
      duration: 2000,
    },
  });

  //通过useSpring参数为函数配置实现动画，直接返回样式和API
  const [style, api] = useSpring(() => {
    return {
      from: {
        width: 150,
        height: 80,
      },
      config: {
        mass: 2,
        friction: 10,
        tension: 260,
      },
    };
  });

  useEffect(() => {
    width.start(400);
  }, [width]);

  const onHandleClick = () => {
    api.start({
      width: 400,
      height: 80,
    });
  };

  return (
    <Space direction="vertical" size={24}>
      <div className="title">单元素动画</div>
      <animated.div className="box1" style={{ width }}>
        Demo1
      </animated.div>
      <animated.div className="box1" style={styles}>
        Demo2
      </animated.div>
      <animated.div className="box1" style={style} onClick={onHandleClick}>
        Demo3 点击我试试
      </animated.div>
    </Space>
  );
};

export default SpringBox1;
