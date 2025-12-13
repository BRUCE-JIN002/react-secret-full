import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  ProductOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useMenuStore } from "../App";

type MenuItem = Required<MenuProps>["items"][number];

export const enum HooksType {
  CustomHooks = "hookskey",
  UseGusture = "useGusture",
  UseCookies = "useCookies",
  UseCopyToClipboard = "useCopyToClipboard",
  UseCountDown = "useCountDown",
  UseCounter = "useCounter",
  UseCreation = "useCreation",
  UseCss = "UseCss",
  UseDebounce = "useDebounce",
  UseDebounceFn = "useDebounceFn",
  UseDocumentVisibility = "useDocumentVisibility",
  UseEventListener = "useEventListener",
  UseForceUpdate = "useForceUpdate",
  UseFullscreen = "useFullscreen",
  UseHover = "useHover",
  UseInViewport = "useInViewport",
  UseIsomorphicEffect = "useIsomorphicEffect",
  UseLatest = "useLatest",
  UseLifecycle = "useLifecycle",
  UseLockFn = "useLockFn",
  UseMountedState = "useMountedState",
  UseMutationObserver = "useMutationObserver",
  UseNetwork = "useNetwork",
  UseReactive = "useReactive",
  UseSafaState = "useSafaState",
  UseScrolling = "useScrolling",
  UseSelection = "useSelection",
  UseSize = "useSize",
  UseTextSelection = "useTextSelection",
  UseTimeout = "useTimeout",
  UseUnmountedRef = "useUnmountedRef",
  UseWhyDidYouUpdate = "useWhyDidYouUpdate",
  UseScroll = "useScroll",
  UseStepProgress = "useStepProgress",
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
  Watermark = "watermark",
  SlidInOverlay = "slidInOverlay",
  Modal = "modal",
  CheckCard = "checkCard",
  Tab = "tab",
}

export const enum ThirdParyLibrary {
  ThirdParyLib = "thirdParyLib",
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
  ReactFlow = "reactFlow",
  ReactFlowBase = "reactFlowBase",
  ReactFlowAudioPlay = "reactFlowAudioPlay",
  AudioContext = "audioContext",
}

export const enum Projects {
  Comprehesive = "comprehesive",
  TodoList = "todolist",
  Collapse = "collapse",
}

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
};

const items: MenuProps["items"] = [
  getItem("自定义 Hooks", HooksType.CustomHooks, <MailOutlined />, [
    getItem("useCookies", HooksType.UseCookies),
    getItem("useCopyToClipboard", HooksType.UseCopyToClipboard),
    getItem("useCountdown", HooksType.UseCountDown),
    getItem("useCounter", HooksType.UseCounter),
    getItem("useCreation", HooksType.UseCreation),
    getItem("useCss", HooksType.UseCss),
    getItem("useDebounce", HooksType.UseDebounce),
    getItem("useDebounceFn", HooksType.UseDebounceFn),
    getItem("useDocumentVisibility", HooksType.UseDocumentVisibility),
    getItem("useEventListener", HooksType.UseEventListener),
    getItem("useForceUpdate", HooksType.UseForceUpdate),
    getItem("useFullscreen", HooksType.UseFullscreen),
    getItem("useHover", HooksType.UseHover),
    getItem("useInViewport", HooksType.UseInViewport),
    getItem("useIsomorphicEffect", HooksType.UseIsomorphicEffect),
    getItem("useLatest", HooksType.UseLatest),
    getItem("useLifecycle", HooksType.UseLifecycle),
    getItem("useLockFn", HooksType.UseLockFn),
    getItem("useMountedState", HooksType.UseMountedState),
    getItem("useMutationObserver", HooksType.UseMutationObserver),
    getItem("useNetwork", HooksType.UseNetwork),
    getItem("useReactive", HooksType.UseReactive),
    getItem("useSafaState", HooksType.UseSafaState),
    getItem("useScrolling", HooksType.UseScrolling),
    getItem("useSelection", HooksType.UseSelection),
    getItem("useSize", HooksType.UseSize),
    getItem("useTextSelection", HooksType.UseTextSelection),
    getItem("useTimeout", HooksType.UseTimeout),
    getItem("useUnmountedRef", HooksType.UseUnmountedRef),
    getItem("useWhyDidYouUpdate", HooksType.UseWhyDidYouUpdate),
    getItem("useScroll", HooksType.UseScroll),
    getItem("useStepProgress", HooksType.UseStepProgress),
  ]),

  { type: "divider" },

  getItem("组件示例", ComponentsType.ComponentsDemo, <AppstoreOutlined />, [
    getItem("倒计时", ComponentsType.CountDown),
    getItem("MinCalendar 迷你日历", ComponentsType.MinCalendar),
    getItem("Calendar 日历", ComponentsType.Calendar),
    getItem("Icon 图标", ComponentsType.Icon),
    getItem("QRcode 二维码", ComponentsType.QRcode),
    getItem("Watermark 水印 ", ComponentsType.Watermark),
    getItem("Space 间距", ComponentsType.Space),
    getItem("Code 代码块", ComponentsType.CodeDemo),
    getItem("Popover 气泡卡片", ComponentsType.Popover),
    getItem("Message 全局提示", ComponentsType.Message),
    getItem("OnBoarding 漫游式引导", ComponentsType.OnBoarding),
    getItem("Form 表单组件", ComponentsType.Form),
    getItem("Upload 拖拽上传", ComponentsType.Upload),
    getItem("Lazyload 懒加载", ComponentsType.Lazyload),
    getItem("SlideInoverlay 转场动画", ComponentsType.SlidInOverlay),
    getItem("Modal 模态框", ComponentsType.Modal),
    getItem("CheckCard 多选卡片", ComponentsType.CheckCard),
    getItem("Tab 标签页", ComponentsType.Tab),
  ]),

  { type: "divider" },

  getItem("三方库", ThirdParyLibrary.ThirdParyLib, <ProductOutlined />, [
    getItem("react-spring", ThirdParyLibrary.ReactSpring, "", [
      getItem("单元素动画", ThirdParyLibrary.ReactSpring1),
      getItem("多元素动画", ThirdParyLibrary.ReactSpring2),
      getItem("复杂动画", ThirdParyLibrary.ReactSpring3),
      getItem("综合应用", ThirdParyLibrary.ReactSprings),
    ]),
    getItem("react-dnd", ThirdParyLibrary.ReactDnd, "", [
      getItem("普通拖拽", ThirdParyLibrary.ReactDnd1),
      getItem("拖拽排序", ThirdParyLibrary.ReactDnd2),
    ]),
    getItem("use-gestrue", ThirdParyLibrary.UseGesture),
    getItem("my-zustand", ThirdParyLibrary.Zustand),
    getItem("click-to-component", ThirdParyLibrary.ToComponent),
    getItem("react-flow", ThirdParyLibrary.ReactFlow, "", [
      getItem("基础使用", ThirdParyLibrary.ReactFlowBase),
      getItem("音频播放", ThirdParyLibrary.ReactFlowAudioPlay),
    ]),
    getItem("online-pinao", ThirdParyLibrary.AudioContext),
  ]),

  { type: "divider" },

  getItem("综合项目", Projects.Comprehesive, <SettingOutlined />, [
    getItem("TodoList", Projects.TodoList),
  ]),
];

const MenuList: React.FC = () => {
  const updateCurrentPage = useMenuStore((state) => state.updateCurrentPage);
  const currentPage = useMenuStore((state) => state.currentPage);
  const collapse = useMenuStore((state) => state.collapse);

  return (
    <Menu
      onClick={(e) => updateCurrentPage(e.key as ComponentsType | HooksType)}
      defaultSelectedKeys={[currentPage as ComponentsType.MinCalendar]}
      mode="inline"
      theme="dark"
      items={items}
      inlineCollapsed={collapse}
    />
  );
};

export default MenuList;
