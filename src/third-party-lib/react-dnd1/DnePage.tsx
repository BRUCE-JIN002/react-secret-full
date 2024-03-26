import { DndProvider, useDrag, useDragLayer, useDrop } from "react-dnd";
import { useEffect, useRef, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragTip from "./dragTip";
import "./index.scss";
import { Space } from "antd";

interface ItemType {
  color: string;
}
interface BoxProps {
  color: string;
}
function Box(props: BoxProps) {
  const ref = useRef(null);

  const [{ dragging }, drag, dragPreview] = useDrag({
    type: "box",
    item: {
      color: props.color,
    },
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      };
    },
  });

  useEffect(() => {
    drag(ref);
    // dragPreview(getEmptyImage());
  }, []);

  return (
    <div
      ref={ref}
      className={dragging ? "box dragging" : "box"}
      style={{ background: props.color || "blue" }}
    />
  );
}

function TargetContainer() {
  const [boxes, setBoxes] = useState<ItemType[]>([]);
  const ref = useRef(null);

  const [, drop] = useDrop(() => {
    return {
      accept: "box",
      drop(item: ItemType) {
        setBoxes((boxes) => [...boxes, item]);
      },
    };
  });

  useEffect(() => {
    drop(ref);
  }, []);

  return (
    <div ref={ref} className="container">
      {Array.isArray(boxes) && boxes.length === 0 && <DragTip />}
      {boxes.map((item) => {
        return <Box color={item.color}></Box>;
      })}
    </div>
  );
}

const DragLayer = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging) {
    return null;
  }
  return (
    <div
      className="drag-layer"
      style={{
        left: currentOffset?.x,
        top: currentOffset?.y,
        color: item.color,
      }}
    >
      dragging...
    </div>
  );
};

function DndPage1() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", justifyContent: "center", gap: 35 }}>
        <div
          style={{
            border: "1px solid #00000070",
            height: 300,
            aspectRatio: 1,
            borderRadius: 4,
            padding: 10,
          }}
        >
          <Space size={10} direction="vertical">
            <Box color="red" />
            <Box color="gold" />
            <Box color="skyblue" />
            <Box color="yellowgreen" />
            <DragLayer />
          </Space>
        </div>
        <TargetContainer />
      </div>
    </DndProvider>
  );
}

export default DndPage1;
