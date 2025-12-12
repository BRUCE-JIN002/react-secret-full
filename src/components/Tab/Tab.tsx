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
              <span>{tab.label}</span>
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

export { Tab };
export type { TabProps, TabItemProps };
