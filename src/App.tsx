import { FC, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import MenuList, {
  ComponentsType,
  HooksType,
  Projects,
  ThirdParyLibrary,
} from "./menu/Menu";
import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import CustomHooks from "./modules/CustomHooks";
import ComponentDemo from "./modules/ComponentDemo";
import ThirdLibDemo from "./modules/ThirdLibDemo";
import ComprehensiveDemo from "./modules/ComprehensiveDemo";
import { Spin } from "antd";

export type MenuKey = ComponentsType | HooksType | ThirdParyLibrary | Projects;
export interface PageState {
  currentPage?: MenuKey;
  updateCurrentPage: (v: MenuKey) => void;
}

const stateCreator: StateCreator<PageState> = (set) => ({
  currentPage: ComponentsType.MinCalendar,
  updateCurrentPage: (value: MenuKey) => set(() => ({ currentPage: value })),
});

export const useMenuStore = create<PageState>()(
  persist(stateCreator, {
    name: "menuList",
    version: 1,
  })
);

const App: FC = () => {
  const currentPage = useMenuStore((state) => state.currentPage);

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        return (
          <div>
            <p>出错了：</p>
            <div>{error}</div>
          </div>
        );
      }}
    >
      <Suspense fallback={<Spin size="large" />}>
        <div style={{ display: "flex" }}>
          <div className="menu">
            <MenuList />
          </div>
          <div className="content">
            <CustomHooks currentPage={currentPage} />
            <ComponentDemo currentPage={currentPage} />
            <ThirdLibDemo currentPage={currentPage} />
            <ComprehensiveDemo currentPage={currentPage} />
          </div>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
