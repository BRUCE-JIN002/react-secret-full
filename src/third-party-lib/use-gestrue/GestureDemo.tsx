import { animated, useSprings } from "@react-spring/web";
import React, { useEffect, useRef } from "react";
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
  const width = ref.current?.clientWidth ?? window.innerWidth;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [stateShowCode, setShowCode] = useBoolean(false);

  const [props, api] = useSprings(pages.length, (i) => ({
    x: i * width,
    scale: 1
  }));

  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], cancel }) => {
      if (active && Math.abs(mx) > width / pages.length) {
        let newIndex = activeIndex + (xDir > 0 ? -1 : 1);
        if (newIndex < 0) {
          return;
        }
        if (newIndex > pages.length - 1) {
          newIndex = pages.length - 1;
        }
        setActiveIndex(newIndex);
        cancel();
      }
      api.start((i) => {
        const x = (i - activeIndex) * width + (active ? mx : 0);
        const scale = active ? 1 - Math.abs(mx) / width / 1.2 : 1;
        return { x, scale };
      });
    }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % pages.length;
        api.start((i) => {
          const x = (i - nextIndex) * width;
          return {
            x,
            immediate: prevIndex === pages.length - 1 && nextIndex === 0
          };
        });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [api, width]);

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
                  setActiveIndex(index);
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
