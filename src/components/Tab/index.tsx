import React, { FunctionComponent } from "react";
import { useState, ReactNode, useCallback, useMemo } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

// 定义 TabItem 的 props 类型
interface TabItemProps {
  children: ReactNode;
  name?: string;
  label?: string;
  disabled?: boolean;
  icon?: ReactNode;
}

// 定义 Tab 的 props 类型
interface TabProps {
  defaultActive?: string;
  children: ReactNode;
  onChange?: (name: string) => void;
  className?: string;
  size?: "small" | "default" | "large";
  type?: "line" | "card";
}

// 定义 tab 项的类型
interface TabItemType {
  name: string;
  label: string;
  active: boolean;
  disabled: boolean;
  icon?: ReactNode;
  component: React.ReactElement<TabItemProps>;
}

const Tab = ({
  defaultActive,
  children,
  onChange,
  className,
  size = "default",
  type = "line",
}: TabProps) => {
  const [activeTab, setActiveTab] = useState<string | null>(
    defaultActive || null
  );

  /** 提供给tab使用 */
  const { tabList, renderChildren } = useMemo(() => {
    const tabs: TabItemType[] = [];
    let activeChild: React.ReactElement<TabItemProps> | null = null;

    React.Children.forEach(children, (item) => {
      if (
        React.isValidElement<TabItemProps>(item) &&
        typeof item.type === "function" &&
        (item.type as FunctionComponent).displayName === "tabItem"
      ) {
        const { props } = item;
        const { label, name, disabled, icon } = props;

        if (name && label) {
          const tabItem: TabItemType = {
            name,
            label,
            active: activeTab === name,
            disabled: disabled || false,
            icon,
            component: item as React.ReactElement<TabItemProps>,
          };
          if (name === activeTab) {
            activeChild = item as React.ReactElement<TabItemProps>;
          }
          tabs.push(tabItem);
        }
      }
    });

    /** 第一次加载或者 props children 改变的情况 */
    if (!activeChild && tabs.length > 0) {
      const firstChildren = tabs.find((tab) => !tab.disabled) || tabs[0];
      const firstTabName = firstChildren.component.props.name || null;
      if (activeTab !== firstTabName) {
        setActiveTab(firstTabName);
      }
      activeChild = firstChildren.component;
    }

    return { tabList: tabs, renderChildren: activeChild };
  }, [children, activeTab]);

  const changeTab = useCallback(
    (name: string) => {
      const targetTab = tabList.find((tab) => tab.name === name);
      if (targetTab?.disabled) return;

      setActiveTab(name);
      onChange?.(name);
    },
    [tabList, onChange]
  );

  return (
    <div
      className={classNames(styles.wrapper, className, {
        [styles.small]: size === "small",
        [styles.large]: size === "large",
        [styles.card]: type === "card",
      })}
    >
      <div className={styles.header}>
        {tabList.map((tab) => {
          return (
            <div
              className={classNames(styles.headerItem, {
                [styles.hightlight]: tab.active,
                [styles.disabled]: tab.disabled,
              })}
              key={tab.name}
              onClick={() => changeTab(tab.name)}
            >
              {tab.icon && <span className={styles.icon}>{tab.icon}</span>}
              <span className={styles.label} data-text={tab.label}>
                {tab.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className={styles.content}>{renderChildren}</div>
    </div>
  );
};

export const TabItem = ({ children }: TabItemProps) => {
  return <div>{children}</div>;
};

TabItem.displayName = "tabItem";

Tab.displayName = "tab";

const TabDemo = () => {
  return (
    <div
      style={{
        padding: "20px",
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        boxSizing: "border-box",
      }}
    >
      <h3>默认样式</h3>
      <Tab defaultActive="react" onChange={(type: string) => console.log(type)}>
        <TabItem name="react" label="React" icon="⚛️">
          <div style={{ padding: "20px" }}>
            <h4>React</h4>
            <p>React 是一个用于构建用户界面的 JavaScript 库。</p>
          </div>
        </TabItem>
        <TabItem name="vue" label="Vue" icon="💚">
          <div style={{ padding: "20px" }}>
            <h4>Vue</h4>
            <p>Vue.js 是一套用于构建用户界面的渐进式框架。</p>
          </div>
        </TabItem>
        <TabItem name="angular" label="Angular" icon="🅰️">
          <div style={{ padding: "20px" }}>
            <h4>Angular</h4>
            <p>Angular 是一个应用设计框架与开发平台。</p>
          </div>
        </TabItem>
        <TabItem name="disabled" label="禁用" disabled>
          <div>这个标签页被禁用了</div>
        </TabItem>
      </Tab>

      <h3 style={{ marginTop: "40px" }}>小尺寸</h3>
      <Tab size="small" defaultActive="tab1">
        <TabItem name="tab1" label="标签一">
          <div style={{ padding: "16px" }}>小尺寸标签页内容</div>
        </TabItem>
        <TabItem name="tab2" label="标签二">
          <div style={{ padding: "16px" }}>另一个标签页</div>
        </TabItem>
      </Tab>

      <h3 style={{ marginTop: "40px" }}>卡片样式</h3>
      <Tab type="card" defaultActive="card1">
        <TabItem name="card1" label="卡片一">
          <div style={{ padding: "20px" }}>卡片样式的标签页</div>
        </TabItem>
        <TabItem name="card2" label="卡片二">
          <div style={{ padding: "20px" }}>另一个卡片</div>
        </TabItem>
      </Tab>
    </div>
  );
};

export default TabDemo;
