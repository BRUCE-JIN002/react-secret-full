import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  ProductOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useMenuStore } from "../../App";

type MenuItem = Required<MenuProps>["items"][number];

export const enum HooksType {
  Hooks = "hookskey",
  UseState = "useStatekey",
  UseEffect = "useEffectkey",
  UseLayoutEffect = "useLayoutEffectkey",
  UseReducer = "useReducerkey",
  UseReducerImmer = "useReducerImmerkey",
  UseRef = "useRefkeys",
  ForwardRefUseImperativeHandle = "forwardRefUseImperativeHandlekey",
  UseContext = "useContextkey",
  MemoUseMemoUseCallback = "MemoUseMemoUseCallback",
}

export const enum ComponentsType {
  ComponentsDemo = "componentsDemo",
  Calendar = "calendar",
  MinCalendar = "minCalendar",
  Icon = "icon",
  QRcode = "qrCode",
  Space = "space",
  CodeDemo = "codeDemo",
  Popover = "popover",
  Message = "message",
  OnBoarding = "onBoarding",
  Form = "form",
  Upload = "upload",
  Lazyload = "lazyload",
  CountDown = "countDown",
}

export const enum ThirdParyLibrary {
  ThirdParyLib = "thirdParyLib",
  TailwindCss = "tailwindCss",
  ReactSpring = "reactSpring",
  ReactSpring1 = "reactSpring1",
  ReactSpring2 = "reactSpring2",
  ReactSpring3 = "reactSpring3",
  ReactSprings = "reactSprings",
  ReactDnd = "ReactDnd",
  ReactDnd1 = "ReactDnd1",
  ReactDnd2 = "ReactDnd2",
  UseGesture = "useGesture",
  Zustand = "zustand",
  ToComponent = "toComponent",
}

export const enum Projects {
  Comprehesive = "comprehesive",
  TodoList = "todolist",
}

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const items: MenuProps["items"] = [
  getItem("Hooks使用", HooksType.Hooks, <MailOutlined />, [
    getItem("useState", HooksType.UseState),
    getItem("useEffect", HooksType.UseEffect),
    getItem("useLayoutEffect", HooksType.UseLayoutEffect),
    getItem("useReducer", HooksType.UseReducer),
    getItem("useReducer + immer", HooksType.UseReducerImmer),
    getItem("useRef", HooksType.UseRef),
    getItem(
      <span title="forwardRef + useImperativeHandle">
        forwardRef + useImperativeHandle
      </span>,
      HooksType.ForwardRefUseImperativeHandle
    ),
    getItem("useContext", HooksType.UseContext),
    getItem(
      <span title="memo + useMemo + useCallback">
        memo + useMemo + useCallback
      </span>,
      HooksType.MemoUseMemoUseCallback
    ),
  ]),

  { type: "divider" },

  getItem("组件示例", ComponentsType.ComponentsDemo, <AppstoreOutlined />, [
    getItem("倒计时", ComponentsType.CountDown),
    getItem("MinCalendar 迷你日历", ComponentsType.MinCalendar),
    getItem("Calendar 日历", ComponentsType.Calendar),
    getItem("Icon 图标", ComponentsType.Icon),
    getItem("QRcode 二维码", ComponentsType.QRcode),
    getItem("Space 间距", ComponentsType.Space),
    getItem("Code 代码块", ComponentsType.CodeDemo),
    getItem("Popover 气泡卡片", ComponentsType.Popover),
    getItem("Message 全局提示", ComponentsType.Message),
    getItem("OnBoarding 漫游式引导", ComponentsType.OnBoarding),
    getItem("Form 表单组件", ComponentsType.Form),
    getItem("Upload 拖拽上传", ComponentsType.Upload),
    getItem("Lazyload 懒加载", ComponentsType.Lazyload),
  ]),

  { type: "divider" },

  getItem("三方库", ThirdParyLibrary.ThirdParyLib, <ProductOutlined />, [
    getItem("Tailwind-css", ThirdParyLibrary.TailwindCss),
    getItem("React-spring", ThirdParyLibrary.ReactSpring, "", [
      getItem("单元素动画", ThirdParyLibrary.ReactSpring1),
      getItem("多元素动画", ThirdParyLibrary.ReactSpring2),
      getItem("复杂动画", ThirdParyLibrary.ReactSpring3),
      getItem("综合应用", ThirdParyLibrary.ReactSprings),
    ]),
    getItem("React-dnd", ThirdParyLibrary.ReactDnd, "", [
      getItem("普通拖拽", ThirdParyLibrary.ReactDnd1),
      getItem("进阶拖拽", ThirdParyLibrary.ReactDnd2),
    ]),
    getItem("use-gestrue", ThirdParyLibrary.UseGesture),
    getItem("my-zustand", ThirdParyLibrary.Zustand),
    getItem("click-to-component", ThirdParyLibrary.ToComponent),
  ]),

  { type: "divider" },

  getItem("综合项目", Projects.Comprehesive, <SettingOutlined />, [
    getItem("TodoList", Projects.TodoList),
  ]),
];

const MenuList: React.FC = () => {
  const updateCurrentPage = useMenuStore((state) => state.updateCurrentPage);
  const currentPage = useMenuStore((state) => state.currentPage);

  return (
    <Menu
      onClick={(e) => updateCurrentPage(e.key as ComponentsType | HooksType)}
      defaultSelectedKeys={[currentPage as ComponentsType.MinCalendar]}
      defaultOpenKeys={[
        ComponentsType.ComponentsDemo,
        ThirdParyLibrary.ThirdParyLib,
      ]}
      mode="inline"
      items={items}
      style={{ width: 256 }}
    />
  );
};

export default MenuList;
