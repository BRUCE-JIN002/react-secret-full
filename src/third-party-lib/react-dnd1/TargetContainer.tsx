import { useRef } from "react";
import Box from "./Box";
import { useDrop } from "react-dnd";
import "./index.scss";
import DragTip from "./DragTips";
import { ItemType } from "./Page";

interface DataSource {
  data: ItemType[];
  onChange: (item: ItemType) => void;
}

const TargetContainer: React.FC<DataSource> = (props) => {
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
    <div ref={ref} className="container">
      {Array.isArray(data) && data.length === 0 && <DragTip />}
      {data.map((item, index) => {
        return <Box color={item.color} key={index} />;
      })}
    </div>
  );
};

export default TargetContainer;
