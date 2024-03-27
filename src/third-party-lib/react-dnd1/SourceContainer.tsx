import React, { useRef } from "react";
import Box from "./Box";
import DragLayer from "./DragLayout";
import { useDrop } from "react-dnd";
import DragTip from "./DragTips";
import { ItemType } from "./Page";

interface DataSource {
  data: ItemType[];
  onChange: (item: ItemType) => void;
}

const SourceContainer: React.FC<DataSource> = (props) => {
  const { data, onChange } = props;
  const ref = useRef(null);

  const [, drop] = useDrop(() => {
    return {
      accept: "box",
      drop: (item: ItemType) => {
        onChange(item);
      },
    };
  });

  drop(ref);

  return (
    <div
      ref={ref}
      style={{
        border: "1px solid #00000070",
        height: 300,
        aspectRatio: 1,
        borderRadius: 4,
        padding: 10,
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        gap: 10,
        position: "relative",
      }}
    >
      {Array.isArray(data) && data.length === 0 && <DragTip />}
      {data.map((box, index) => {
        return <Box color={box.color} key={index} />;
      })}
      <DragLayer />
    </div>
  );
};

export default SourceContainer;
