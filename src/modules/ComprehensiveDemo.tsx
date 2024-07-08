import { FC } from "react";
import { Projects } from "../menu/Menu";
import { MenuKey } from "../App";
import TodoListDemo from "../ts-projects/dnd-todo-list/TodoListDemo";

interface Iprops {
  currentPage?: MenuKey;
}

const ComprehensiveDemo: FC<Iprops> = (props) => {
  const { currentPage } = props;

  return (
    <>
      {/* TodoList 综合实战 */}
      {currentPage === Projects.TodoList && <TodoListDemo />}
    </>
  );
};

export default ComprehensiveDemo;
