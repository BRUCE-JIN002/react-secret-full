import classNames from "classnames";
import { FC, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { useTodoListStore } from "../store";
import { DeleteOutlined } from "@ant-design/icons";

interface GarbaeBaseProps {
  className?: string | string[];
}

export const GarbageBin: FC<GarbaeBaseProps> = (props) => {
  const deleteItem = useTodoListStore((state) => state.deleteItem);
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: "list-item",
    drop: (item: { id: string }) => {
      deleteItem(item.id);
    },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
      };
    },
  });

  useEffect(() => {
    drop(ref);
  }, []);

  return (
    <div
      title="拖到此处删除"
      ref={ref}
      className={classNames(
        "h-200 rounded-md",
        "bg-orange-300",
        "leading-200 text-center text-2xl",
        "cursor-move select-none",
        isOver ? " bg-yellow-400 bordr-dashed" : "",
        props.className
      )}
    >
      <DeleteOutlined className="text-[56px] text-[#e0e0e0]" />
    </div>
  );
};
