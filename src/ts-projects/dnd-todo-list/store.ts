import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

export interface ListItem {
  id: string;
  status: "todo" | "done";
  content: string;
}

type State = {
  list: ListItem[];
};

type Action = {
  addItem: (item: ListItem, id?: string) => void;
  deleteItem: (id: string) => void;
  updateItem: (item: ListItem) => void;
};

const stateCreator: StateCreator<State & Action> = (set) => ({
  list: [],
  addItem: (item: ListItem, id?: string) => {
    set((state) => {
      if (!id) {
        return {
          list: [...state.list, item],
        };
      }
      const newlist = [...state.list];
      const index = newlist.findIndex((item) => item.id === id);
      newlist.splice(index, 0, item);
      return {
        list: newlist,
      };
    });
  },
  deleteItem: (id: string) => {
    set((state) => {
      return {
        list: state.list.filter((item) => item.id !== id),
      };
    });
  },
  updateItem: (updateItem: ListItem) => {
    set((state) => {
      return {
        list: state.list.map((item) => {
          if (item.id === updateItem.id) {
            return updateItem;
          }
          return item;
        }),
      };
    });
  },
});

export const useTodoListStore = create<State & Action>()(
  persist(stateCreator, {
    name: "todoList",
  })
);
