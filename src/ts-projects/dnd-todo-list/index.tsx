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
          "w-full min-h-[400px] m-auto p-4",
          "rounded-lg",
          "flex flex-wrap gap-6 justify-between items-start"
        )}
        style={{ border: "1px solid #e3e7ed", background: "#f8fafc" }}
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
