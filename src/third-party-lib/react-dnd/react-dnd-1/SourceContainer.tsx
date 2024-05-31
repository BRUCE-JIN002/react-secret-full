import React, { useRef } from "react";
import Box from "./Box";
import DragLayer from "./DragLayout";
import { DropTargetMonitor, useDrop } from "react-dnd";
import DragTip from "./DragTips";
import { ItemType } from "./Page";

interface DataSource {
  data: ItemType[];
  onChange: (item: ItemType) => void;
}

const SourceContainer: React.FC<DataSource> = (props) => {
  const { data, onChange } = props;
  const ref = useRef(null);

  const [{ isOver, canDrop }, drop] = useDrop(() => {
    return {
      accept: "box",
      drop: (item: ItemType) => {
        onChange(item);
      },
      collect: (monitor: DropTargetMonitor<ItemType>) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    };
  }, [ref]);

  drop(ref);

  return (
    <div
      ref={ref}
      style={{
        border: "1px solid #00000070",
        background: isOver ? "#00000010" : undefined,
        boxShadow: canDrop ? "8px 8px 30px #00000070" : undefined,
      }}
      className="container"
    >
      {((Array.isArray(data) && data.length === 0) || canDrop) && <DragTip />}
      {data.map((box, index) => {
        return <Box color={box.color} key={index} id={box.id} />;
      })}
      <DragLayer />
    </div>
  );
};

export default SourceContainer;
