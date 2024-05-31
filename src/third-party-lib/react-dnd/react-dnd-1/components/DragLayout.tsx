import React from "react";
import { useDragLayer } from "react-dnd";
import "./index.scss";

const DragLayer: React.FC = () => {
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

export default DragLayer;
