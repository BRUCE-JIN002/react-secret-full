import { FC, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import MenuList, {
  ComponentsType,
  HooksType,
  Projects,
  ThirdParyLibrary
} from "./menu/Menu";
import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import CustomHooks from "./modules/CustomHooks";
import ComponentDemo from "./modules/ComponentDemo";
import ThirdLibDemo from "./modules/ThirdLibDemo";
import ComprehensiveDemo from "./modules/ComprehensiveDemo";
import { Spin } from "antd";
import classNames from "classnames";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export type MenuKey = ComponentsType | HooksType | ThirdParyLibrary | Projects;
export interface PageState {
  collapse: boolean;
  currentPage?: MenuKey;
  updateCurrentPage: (v: MenuKey) => void;
  toggleCollapse: () => void;
}

const stateCreator: StateCreator<PageState> = (set) => ({
  collapse: true,
  currentPage: ComponentsType.MinCalendar,
  updateCurrentPage: (value: MenuKey) => set(() => ({ currentPage: value })),
  toggleCollapse: () => set((state) => ({ collapse: !state.collapse }))
});

export const useMenuStore = create<PageState>()(
  persist(stateCreator, {
    name: "menuList",
    version: 1
  })
);

const App: FC = () => {
  const collapse = useMenuStore((state) => state.collapse);
  const currentPage = useMenuStore((state) => state.currentPage);
  const toggleCollapse = useMenuStore((state) => state.toggleCollapse);

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <div className={classNames("menu", collapse ? "inlineMode" : "")}>
            <div className="menuWrapper">
              <MenuList />
            </div>
            <div onClick={toggleCollapse} className="collapseButton">
              {!collapse ? (
                <LeftOutlined style={{ color: "#ffffffA6" }} />
              ) : (
                <RightOutlined style={{ color: "#ffffffA6" }} />
              )}
            </div>
          </div>
          <div className="nav">demo</div>
          <div
            className={classNames("content", collapse ? "collapseContent" : "")}
          >
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
