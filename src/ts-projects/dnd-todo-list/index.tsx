import { FC } from "react";
import { NewItem } from "./components/NewItem";
import { GarbageBin } from "./components/GarbageBin";
import classNames from "classnames";
import { List } from "./components/List";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

interface TodoListProps {}

export const TodoList: FC<TodoListProps> = (props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={classNames(
          "w-1000 h-600 m-auto mt-100 p-10",
          " border-[1px] border-[#ccc] rounded-lg",
          " flex justify-between items-start"
        )}
      >
        <div
          className={classNames("flex-2 h-full mr-10 overflow-auto rounded-lg")}
        >
          <List />
        </div>
        <div className="flex-1 h-full pt-10">
          <NewItem />
          <GarbageBin className={"mt-10"} />
        </div>
      </div>
    </DndProvider>
  );
};
