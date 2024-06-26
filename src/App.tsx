import { FC } from "react";
import MinCalendarDemo from "./components/miniCalendar/Demo";
import MenuList, {
  ComponentsType,
  HooksType,
  Projects,
  ThirdParyLibrary,
} from "./components/menu/Menu";
import { StateCreator, create } from "zustand";
import CalendarDemo from "./components/calendar/CalendarDemo";
import IconDemo from "./components/Icon/IconDemo";
import MyQRcode from "./components/qrcode/QrCode";
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
import Viewpager from "./third-party-lib/use-gestrue/GestureDemo";
import PopoverDemo from "./components/popover/PopoverDemo";
import MessageDemo from "./components/message/MessageDemo";
import TodoListDemo from "./ts-projects/dnd-todo-list/TodoListDemo";
import OnBoardingDemo from "./components/onBoarding/Demo";
import FormDemo from "./components/form/FormDemo";
import { persist } from "zustand/middleware";
import UploadDemo from "./components/upload/UploadDemo";
import LazyloadDemo from "./components/lazyLoad/LazyloadDemo";
import TestZustand from "./zustand/TestZustand";
import ClickToComponentDemo from "./third-party-lib/click-to-component";
import CountDemo from "./components/countDown";
import WatermarkDemo from "./components/watermark/WatermarkDemo";
import SlidInOverlayDemo from "./components/slideInOverlay/SlidInOverlayDemo";
import ModalDemo from "./components/modal/ModalDemo";
import CheckCardDemo from "./components/checkCard/CheckCardDemo";

type MenuKey = ComponentsType | HooksType | ThirdParyLibrary | Projects;
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
        {/**---------------------------------------------------- */}

        {/** 倒计时 */}
        {currentPage === ComponentsType.CountDown && <CountDemo />}
        {/** 迷你日历 */}
        {currentPage === ComponentsType.MinCalendar && <MinCalendarDemo />}
        {/* 日历组件 */}
        {currentPage === ComponentsType.Calendar && <CalendarDemo />}
        {/* Icon组件 */}
        {currentPage === ComponentsType.Icon && <IconDemo />}
        {/* 二维码组件 */}
        {currentPage === ComponentsType.QRcode && <MyQRcode />}
        {/** 水印组件 */}
        {currentPage === ComponentsType.Watermark && <WatermarkDemo />}
        {/* Space组件 */}
        {currentPage === ComponentsType.Space && <SpaceDemo />}
        {/* 代码块 */}
        {currentPage === ComponentsType.CodeDemo && <CodeDemo />}
        {/* Popover */}
        {currentPage === ComponentsType.Popover && <PopoverDemo />}
        {/* Message */}
        {currentPage === ComponentsType.Message && <MessageDemo />}
        {/* OnBoarding */}
        {currentPage === ComponentsType.OnBoarding && <OnBoardingDemo />}
        {/** Form */}
        {currentPage === ComponentsType.Form && <FormDemo />}
        {/** Upload */}
        {currentPage === ComponentsType.Upload && <UploadDemo />}
        {/** Lazyload */}
        {currentPage === ComponentsType.Lazyload && <LazyloadDemo />}
        {/** SlidInOverlay */}
        {currentPage === ComponentsType.SlidInOverlay && <SlidInOverlayDemo />}
        {/** Modal */}
        {currentPage === ComponentsType.Modal && <ModalDemo />}
        {/** CheckCard */}
        {currentPage === ComponentsType.CheckCard && <CheckCardDemo />}

        {/**---------------------------------------------------- */}

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
        {/* UseGesture & react-spring 手势动画示例 */}
        {currentPage === ThirdParyLibrary.UseGesture && <Viewpager />}
        {/** zustand 实现 */}
        {currentPage === ThirdParyLibrary.Zustand && <TestZustand />}
        {/** clickToComponent */}
        {currentPage === ThirdParyLibrary.ToComponent && (
          <ClickToComponentDemo />
        )}
        {/**---------------------------------------------------- */}

        {/* TodoList 综合实战 */}
        {currentPage === Projects.TodoList && <TodoListDemo />}
      </div>
    </div>
  );
};

export default App;
