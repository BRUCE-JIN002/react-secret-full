import { useRef } from "react";
import Box from "./Box";
import { DropTargetMonitor, useDrop } from "react-dnd";
import "./index.scss";
import DragTip from "./DragTips";
import { ItemType } from "./Page";
import DragLayer from "./DragLayout";

interface DataSource {
  data: ItemType[];
  onChange: (item: ItemType) => void;
}

const TargetContainer: React.FC<DataSource> = (props) => {
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
  });

  drop(ref);

  return (
    <div
      ref={ref}
      className="container"
      style={{
        border: "1px solid #00000070",
        background: isOver ? "#00000010" : undefined,
        boxShadow: canDrop ? "8px 8px 30px #00000070" : undefined,
      }}
    >
      {((Array.isArray(data) && data.length === 0) || canDrop) && <DragTip />}
      {data.map((item, index) => {
        return <Box color={item.color} key={index} id={item.id} />;
      })}
      <DragLayer />
    </div>
  );
};

export default TargetContainer;
