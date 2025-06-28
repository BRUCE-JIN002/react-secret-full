import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { HooksType } from "../../menu/Menu";

export interface ConfigListItem {
  id?: HooksType;
  fileName?: string;
  expand?: boolean;
  skinColor?: string;
  theme?: string;
  collapse?: boolean;
  minimap?: boolean;
}

type State = {
  configList: ConfigListItem[];
};

type Action = {
  updateConfig: (item: ConfigListItem) => void;
};

const stateCreator: StateCreator<State & Action> = (set) => ({
  configList: [],
  updateConfig: (item: ConfigListItem) => {
    set((state) => {
      const exist =
        state.configList.findIndex((cur) => cur.id === item.id) > -1;
      if (!exist) {
        return {
          configList: [...state.configList, item]
        };
      }
      const newlist = [...state.configList];
      const index = newlist.findIndex((cur) => cur.id === item.id);
      newlist.splice(index, 1, item);
      return {
        configList: newlist
      };
    });
  }
});

export const useCodeConfigStore = create<State & Action>()(
  persist(stateCreator, {
    name: "codeConfigList",
    version: 1.1
  })
);
