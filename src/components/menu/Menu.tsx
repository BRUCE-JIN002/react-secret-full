import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
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
    getItem("MinCalendar 迷你日历", ComponentsType.MinCalendar),
    getItem("Calendar 日历", ComponentsType.Calendar),
    getItem("Icon 图标", ComponentsType.Icon),
    getItem("QRcode 二维码", ComponentsType.QRcode),
    getItem("Space 间距", ComponentsType.Space),
    getItem("Code 代码块", ComponentsType.CodeDemo),
  ]),

  { type: "divider" },

  getItem("三方库", ThirdParyLibrary.ThirdParyLib, <SettingOutlined />, [
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
  ]),
];

const MenuList: React.FC = () => {
  const updateCurrentPage = useMenuStore((state) => state.updateCurrentPage);

  return (
    <Menu
      onClick={(e) => updateCurrentPage(e.key as ComponentsType | HooksType)}
      defaultSelectedKeys={[ComponentsType.MinCalendar]}
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
