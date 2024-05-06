import classNames from "classnames";
import { FC, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { useTodoListStore } from "../store";

interface GapProps {
  id?: string;
}

export const Gap: FC<GapProps> = (props) => {
  const { id } = props;
  const addItem = useTodoListStore((state) => state.addItem);
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(() => {
    return {
      accept: "new-item",
      drop: (item) => {
        addItem(
          {
            id: Math.random().toString().slice(2, 8),
            status: "todo",
            content: "待办事项",
          },
          id
        );
      },
      collect(monitor) {
        return {
          isOver: monitor.isOver(),
        };
      },
    };
  });

  useEffect(() => {
    drop(ref);
  }, []);

  return (
    <div
      ref={ref}
      className={classNames(
        "h-12",
        isOver
          ? "bg-red-300 h-[50px] rounded-md  border-[1px] border-[#e0e0e0] border-dashed"
          : ""
      )}
    />
  );
};
