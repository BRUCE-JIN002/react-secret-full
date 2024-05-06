import { PlusOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { FC, useEffect, useRef } from "react";
import { useDrag } from "react-dnd";

interface NewItemProps {
  className?: string | string[];
}

export const NewItem: FC<NewItemProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ dragging }, drag] = useDrag({
    type: "new-item",
    item: {},
    collect: (monitor) => {
      return {
        dragging: monitor.isDragging(),
      };
    },
  });

  useEffect(() => {
    drag(ref);
  }, []);

  return (
    <div
      title="拖动添加待办"
      ref={ref}
      className={classNames(
        "h-100 rounded-md",
        "leading-100 text-center text-2xl",
        "bg-green-400 border-[1px] border-[#e0e0e0]",
        "cursor-move select-none",
        "flex items-center justify-center",
        dragging ? "border-dashed bg-white" : "",
        props.className
      )}
    >
      <PlusOutlined className="text-[56px] text-[#e0e0e0]" />
    </div>
  );
};
