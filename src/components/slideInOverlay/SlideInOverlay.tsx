import { animated, useTransition } from "@react-spring/web";
import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import Overlay from "./Overlay";
import { CSSProperties } from "styled-components";
import classNames from "classnames";

export interface SlideInOverlayProps extends PropsWithChildren {
  isVisible?: boolean;
  from?: "right" | "bottom";
  className?: string | string[];
  style?: CSSProperties;
  duration?: number;
  onEnter?: () => void;
  onLeave?: () => void;
}

const SlideInOverlay: FC<SlideInOverlayProps> = (props) => {
  const {
    isVisible,
    from = "right",
    children,
    className,
    style,
    duration = 300,
    onEnter,
    onLeave,
  } = props;

  const visibleRef = useRef(isVisible);

  const x = useMemo(() => {
    return from === "right" ? window.screen.width : window.screen.height;
  }, [from]);

  const transitions = useTransition(isVisible, {
    x,
    opacity: 1,
    from: {
      x,
      opacity: 1,
    },
    enter: { x: 0, opacity: 1 },
    leave: { x, opacity: 0 },
    config: { duration: duration },
  });

  const translate = useCallback(
    (x: number) => {
      switch (from) {
        case "right":
          return `translateX(${x}px)`;
        case "bottom":
          return `translateY(${x}px)`;
      }
    },
    [from]
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (isVisible === true && onEnter != null) {
      timer = setTimeout(onEnter, duration);
    }

    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [duration, isVisible, onEnter]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (isVisible === false && onLeave != null && visibleRef.current === true) {
      timer = setTimeout(onLeave, duration);
    }
    visibleRef.current = isVisible;

    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [duration, isVisible, onLeave]);

  return (
    <>
      {transitions(
        (props, isVisible) =>
          isVisible && (
            <Overlay
              as={animated.div}
              className={classNames(className)}
              style={{
                ...style,
                transform: props.x.to((x) => (x === 0 ? "none" : translate(x))),
                opacity: props.opacity,
              }}
              width={300}
            >
              {children}
            </Overlay>
          )
      )}
    </>
  );
};

export default SlideInOverlay;
