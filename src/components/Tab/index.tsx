import React, { FunctionComponent } from "react";
import { useRef, useState, ReactNode } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

// 定义 TabItem 的 props 类型
interface TabItemProps {
  children: ReactNode;
  name?: string;
  label?: string;
}

// 定义 Tab 的 props 类型
interface TabProps {
  defaultActive?: string;
  children: ReactNode;
  onChange?: (name: string) => void;
}

// 定义 tab 项的类型
interface TabItemType {
  name: string;
  label: string;
  active: boolean;
  component: React.ReactElement<TabItemProps>;
}

const Tab = ({ defaultActive, children, onChange }: TabProps) => {
  const activeIndex = useRef<string | null>(defaultActive || null);
  const [, forceUpdate] = useState({});

  /** 提供给tab使用 */
  const tabList: TabItemType[] = [];
  /** 待渲染组件 */
  let renderChildren: React.ReactElement<TabItemProps> | null = null;

  React.Children.forEach(children, (item) => {
    if (
      React.isValidElement<TabItemProps>(item) &&
      typeof item.type === "function" &&
      (item.type as FunctionComponent).displayName === "tabItem"
    ) {
      const { props } = item;
      const { label, name } = props;

      if (name && label) {
        const tabItem: TabItemType = {
          name,
          label,
          active: activeIndex.current === name,
          component: item as React.ReactElement<TabItemProps>
        };
        if (name === activeIndex.current) {
          renderChildren = item as React.ReactElement<TabItemProps>;
        }
        tabList.push(tabItem);
      }
    }
  });

  /** 第一次加载或者 props children 改变的情况 */
  if (!renderChildren && tabList.length > 0) {
    const firstChildren = tabList[0];
    activeIndex.current = firstChildren.component.props.name || null;
    renderChildren = firstChildren.component;
  }

  const changeTab = (name: string) => {
    activeIndex.current = name;
    forceUpdate({});
    onChange?.(name);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {tabList.map((tab) => {
          return (
            <div
              className={classNames(styles.headerItem, {
                [styles.hightlight]: tab.active
              })}
              key={tab.name}
              onClick={() => changeTab(tab.name)}
            >
              <div>{tab.label}</div>
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
    <Tab defaultActive="react" onChange={(type: string) => console.log(type)}>
      <TabItem name="react" label="react">
        React
      </TabItem>
      <TabItem name="vue" label="vue">
        Vue
      </TabItem>
      <TabItem name="angular" label="angular">
        Angular
      </TabItem>
    </Tab>
  );
};

export default TabDemo;
