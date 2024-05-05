import { animated, useSprings } from "@react-spring/web";
import React, { useRef } from "react";
import { useDrag } from "@use-gesture/react";
import "./styles.scss";
import { useBoolean } from "ahooks";
import ViewpagerCode from "./Codes";

const pages = [
  "https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
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
  const index = useRef(0);
  const [stateShowCode, setShowCode] = useBoolean(false);

  const [props, api] = useSprings(pages.length, (i) => ({
    x: i * width,
    scale: 1,
  }));

  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], cancel }) => {
      if (active && Math.abs(mx) > width / 5) {
        let newIndex = index.current + (xDir > 0 ? -1 : 1);
        if (newIndex < 0) {
          newIndex = 0;
        }
        if (newIndex > pages.length - 1) {
          newIndex = pages.length - 1;
        }

        index.current = newIndex;
        cancel();
      }
      api.start((i) => {
        const x = (i - index.current) * width + (active ? mx : 0);
        const scale = active ? 1 - Math.abs(mx) / width / 1.2 : 1;
        return { x, scale };
      });
    }
  );

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
                  backgroundRepeat: "no-repeat",
                }}
              />
            </animated.div>
          ))}
        </div>
      ) : (
        <ViewpagerCode onToggle={() => setShowCode.toggle()} />
      )}
    </>
  );
};

export default Viewpager;
