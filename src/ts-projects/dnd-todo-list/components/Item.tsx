import classNames from "classnames";
import { FC, useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { ListItem, useTodoListStore } from "../store";
import { Checkbox, Input } from "antd";

interface ItemProps {
  data: ListItem;
}

export const Item: FC<ItemProps> = (props) => {
  const { data } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState(data.content);
  const updateItem = useTodoListStore((state) => state.updateItem);
  const [{ dragging }, drag] = useDrag({
    type: "list-item",
    item: {
      id: data.id,
    },
    collect(monitor) {
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
      ref={ref}
      className={classNames(
        "h-[65px] border-[1px] border-[#e0e0e0] bg-blue-300 p-10 rounded-md",
        "flex justify-start items-center",
        "text-xl tracking-wide",
        dragging ? "bg-white border-dashed" : ""
      )}
      onDoubleClick={() => {
        setIsEditing(true);
      }}
    >
      <Checkbox
        type="checkbox"
        className="w-40 h-40 mr-10"
        checked={data.status === "done" ? true : false}
        onChange={(e) => {
          updateItem({
            ...data,
            status: e.target.checked ? "done" : "todo",
          });
        }}
      />
      <p className="text-[14px]">
        {isEditing ? (
          <Input
            autoFocus
            value={editingContent}
            onChange={(e) => {
              setEditingContent(e.target.value);
            }}
            onBlur={() => {
              setIsEditing(false);
              updateItem({
                ...data,
                content: editingContent,
              });
            }}
          />
        ) : (
          data.content + data.id
        )}
      </p>
    </div>
  );
};
