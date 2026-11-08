import { animated, useSprings } from "@react-spring/web";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useDrag } from "@use-gesture/react";
import "./styles.scss";
import { useBoolean } from "ahooks";
import ViewpagerCode from "./Codes";
import classNames from "classnames";

const pages = [
  "https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
];

const header = (onToggle: () => void): JSX.Element => (
  <div className="pageHeader" title="查看代码" onClick={onToggle}>
    <span style={{ background: "#ed6a5f" }} />
    <span style={{ background: "#f5bf4f" }} />
    <span style={{ background: "#62c554" }} />
  </div>
);

const Viewpager: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const widthRef = useRef(0);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [stateShowCode, setShowCode] = useBoolean(false);
  activeIndexRef.current = activeIndex;

  const [props, api] = useSprings(pages.length, () => ({
    x: 0,
    scale: 1
  }));

  const readWidth = () => ref.current?.clientWidth || widthRef.current || 0;

  useLayoutEffect(() => {
    if (stateShowCode) return;
    const element = ref.current;
    if (!element) return;
    const apply = () => {
      const next = element.clientWidth;
      if (!next || next === widthRef.current) return;
      widthRef.current = next;
      api.start((i) => ({
        x: (i - activeIndexRef.current) * next,
        scale: 1,
        immediate: true
      }));
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(element);
    return () => observer.disconnect();
  }, [api, stateShowCode]);

  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], cancel }) => {
      const width = readWidth();
      if (!width) return;
      let index = activeIndexRef.current;
      const turned = active && Math.abs(mx) > width / pages.length;
      if (turned) {
        let newIndex = index + (xDir > 0 ? -1 : 1);
        if (newIndex < 0) return;
        if (newIndex > pages.length - 1) newIndex = pages.length - 1;
        index = newIndex;
        activeIndexRef.current = newIndex;
        setActiveIndex(newIndex);
        cancel();
      }
      api.start((i) => {
        const x = (i - index) * width + (active && !turned ? mx : 0);
        const scale = active && !turned ? 1 - Math.abs(mx) / width / 1.2 : 1;
        return { x, scale };
      });
    }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const width = widthRef.current;
        const nextIndex = (prevIndex + 1) % pages.length;
        if (width) {
          api.start((i) => {
            const x = (i - nextIndex) * width;
            return {
              x,
              immediate: prevIndex === pages.length - 1 && nextIndex === 0
            };
          });
        }
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <>
      {stateShowCode === false ? (
        <div ref={ref} className="pageWrapper">
          {header(() => setShowCode.toggle())}
          {props.map(({ x, scale }, index) => (
            <animated.div
              className="page"
              {...bind()}
              key={index}
              style={{ x }}
            >
              <animated.div
                style={{
                  scale,
                  background: `url(${pages[index]})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat"
                }}
              />
            </animated.div>
          ))}
          <div className="indicator">
            {new Array(pages.length).fill(0).map((_, index) => (
              <div
                key={index}
                className={classNames(activeIndex === index ? "active" : "")}
                onClick={() => {
                  const width = readWidth();
                  activeIndexRef.current = index;
                  setActiveIndex(index);
                  if (!width) return;
                  api.start((i) => {
                    const x = (i - index) * width;
                    return { x };
                  });
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <ViewpagerCode onToggle={() => setShowCode.toggle()} />
      )}
    </>
  );
};

export default Viewpager;
