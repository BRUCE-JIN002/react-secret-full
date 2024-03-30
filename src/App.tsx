import { FC } from "react";
import MinCalendarDemo from "./components/min-calendar/Demo";
import MenuList, {
  ComponentsType,
  HooksType,
  ThirdParyLibrary,
} from "./components/menu/Menu";
import { create } from "zustand";
import CalendarDemo from "./components/calendar/CalendarDemo";
import IconDemo from "./components/Icon/IconDemo";
import MyQRcode from "./components/QRCode/QrCode";
import SpaceDemo from "./components/space/SpaceDemo";
import { CodeDemo } from "./components/code/CodeDemo";
import { UseReducerCode } from "./react-hooks/useReducer/UseReducerCode";
import { UseContextCode } from "./react-hooks/useContext/UseContextCode";
import { UseStateCode } from "./react-hooks/useState/UseStateCode";
import DndPage2 from "./third-party-lib/react-dnd/react-dnd-2/DndPage2";
import DndPage1 from "./third-party-lib/react-dnd/react-dnd-1/Page";
import SpringBox1 from "./third-party-lib/react-spring/spring-1/SpringBox1";
import SpringBox2 from "./third-party-lib/react-spring/spring-2/SpringBox2";
import SpringBox3 from "./third-party-lib/react-spring/spring-3/SpringBox3";
import Springs from "./third-party-lib/react-spring/springs/Springs";

export interface PageState {
  currentPage: ComponentsType | HooksType | ThirdParyLibrary;
  updateCurrentPage: (v: ComponentsType | HooksType | ThirdParyLibrary) => void;
}

export const useMenuStore = create<PageState>()((set) => ({
  currentPage: ComponentsType.MinCalendar,
  updateCurrentPage: (value: ComponentsType | HooksType | ThirdParyLibrary) =>
    set(() => ({ currentPage: value })),
}));

const App: FC = () => {
  const currentPage = useMenuStore((state) => state.currentPage);

  return (
    <div style={{ display: "flex" }}>
      <div className="menu">
        <MenuList />
      </div>
      <div className="content">
        {/* useState */}
        {currentPage === HooksType.UseState && <UseStateCode />}
        {/* useReducer */}
        {currentPage === HooksType.UseReducer && <UseReducerCode />}
        {/* useContext */}
        {currentPage === HooksType.UseContext && <UseContextCode />}
        {/** 迷你日历 */}
        {currentPage === ComponentsType.MinCalendar && <MinCalendarDemo />}
        {/* 日历组件 */}
        {currentPage === ComponentsType.Calendar && <CalendarDemo />}
        {/* Icon组件 */}
        {currentPage === ComponentsType.Icon && <IconDemo />}
        {/* 二维码组件 */}
        {currentPage === ComponentsType.QRcode && <MyQRcode />}
        {/* Space组件 */}
        {currentPage === ComponentsType.Space && <SpaceDemo />}
        {/* 代码示例 */}
        {currentPage === ComponentsType.CodeDemo && <CodeDemo />}
        {/* Dnd基础拖拽示例 */}
        {currentPage === ThirdParyLibrary.ReactDnd1 && <DndPage1 />}
        {/* Dnd进阶拖拽示例 */}
        {currentPage === ThirdParyLibrary.ReactDnd2 && <DndPage2 />}
        {/* react-spring简单示例1 */}
        {currentPage === ThirdParyLibrary.ReactSpring1 && <SpringBox1 />}
        {/* react-spring简单示例2 */}
        {currentPage === ThirdParyLibrary.ReactSpring2 && <SpringBox2 />}
        {/* react-spring简单示例3 */}
        {currentPage === ThirdParyLibrary.ReactSpring3 && <SpringBox3 />}
        {/* react-spring综合示例 */}
        {currentPage === ThirdParyLibrary.ReactSprings && <Springs />}
      </div>
    </div>
  );
};

export default App;
