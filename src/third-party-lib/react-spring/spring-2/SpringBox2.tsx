import { animated, useSprings, useTrail } from "@react-spring/web";
import React, { useLayoutEffect, useRef } from "react";
import "./styles.scss";
import Space from "../../../components/space/Space";

const PREFERRED_WIDTH = 400;
const BOX_MARGIN_X = 20;
const MIN_SIDE_BY_SIDE = 140;

const readPx = (value: string) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

// 宽容器保持原来的 400px 目标；放不下两列时缩小到列宽，再窄则改成上下排列。
const targetWidth = (wrapper: HTMLElement) => {
  const parent = wrapper.parentElement;
  if (!parent) return PREFERRED_WIDTH;

  const parentStyle = getComputedStyle(parent);
  const parentInner =
    parent.clientWidth -
    readPx(parentStyle.paddingLeft) -
    readPx(parentStyle.paddingRight);
  const style = getComputedStyle(wrapper);
  const inner = Math.max(
    0,
    parentInner -
      readPx(style.paddingLeft) -
      readPx(style.paddingRight) -
      readPx(style.borderLeftWidth) -
      readPx(style.borderRightWidth)
  );
  const gap = readPx(style.columnGap);
  const sideBySide = Math.floor((inner - gap) / 2 - BOX_MARGIN_X);
  if (sideBySide >= MIN_SIDE_BY_SIDE) {
    wrapper.dataset.layout = sideBySide >= PREFERRED_WIDTH ? "hug" : "fill";
    return Math.min(PREFERRED_WIDTH, Math.max(0, sideBySide));
  }
  wrapper.dataset.layout = "stack";
  return Math.min(PREFERRED_WIDTH, Math.max(0, Math.floor(inner - BOX_MARGIN_X)));
};

const SpringBox2: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
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

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const parent = wrapper?.parentElement;
    if (!wrapper || !parent) return;

    let last = -1;
    const apply = () => {
      const next = targetWidth(wrapper);
      if (next <= 0 || next === last) return;
      last = next;
      api.start({ width: next });
      api2.start({ width: next });
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [api, api2]);

  return (
    <div className="wrapper" ref={wrapperRef}>
      <Space className="spring-column" direction="vertical" size={10}>
        <div className="title">同时执行</div>
        {springs.map((style, index) => (
          <animated.div className="box2" style={style} key={index}>
            {`Demo1-${index + 1}`}
          </animated.div>
        ))}
      </Space>
      <Space className="spring-column" direction="vertical" size={10}>
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
