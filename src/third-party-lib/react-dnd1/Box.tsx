import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import "./index.scss";

interface BoxProps {
  color: string;
}

const Box: React.FC<BoxProps> = (props) => {
  const { color } = props;
  const ref = useRef(null);

  const [{ dragging }, drag, dragPreview] = useDrag({
    type: "box",
    item: {
      color: color,
    },
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      };
    },
  });

  // 自定义预览时用
  // dragPreview(getEmptyImage());

  drag(ref);

  return (
    <div
      ref={ref}
      className={dragging ? "box dragging" : "box"}
      style={{ background: color || "blue" }}
    />
  );
};

export default Box;
