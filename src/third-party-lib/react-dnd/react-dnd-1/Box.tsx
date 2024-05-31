import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import "./index.scss";
import { ItemType } from "./Page";
import classNames from "classnames";

interface BoxProps extends ItemType {}

const Box: React.FC<BoxProps> = (props) => {
  const { color, id } = props;
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
      className={classNames(
        "flex justify-center items-center",
        dragging ? "dragbox dragging" : "dragbox"
      )}
      style={{ background: color || "blue", color: "#eee" }}
    >
      {id}
    </div>
  );
};

export default Box;
