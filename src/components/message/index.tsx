import React, { CSSProperties, ReactNode, forwardRef, useMemo } from "react";
import useMessageStore from "./useStore";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./styles.scss";
import { createPortal } from "react-dom";
import { useTimer } from "./useTimer";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  LoadingOutlined,
  WarningFilled,
} from "@ant-design/icons";

export type Position = "top" | "bottom";
export type Type = "success" | "error" | "info" | "warn" | "loading";

export interface MessageProps {
  style?: CSSProperties;
  className?: string | string[];
  content: ReactNode;
  duration?: number;
  id?: number;
  position?: Position;
  type: Type;
  onClose?: (id: number) => void;
}

export interface MessageRef {
  add: (messageProps: MessageProps) => number;
  remove: (id: number) => void;
  update: (id: number, messageProps: MessageProps) => void;
  clearAll: () => void;
}

const MessageItem: React.FC<MessageProps> = (item) => {
  const { onMouseEnter, onMouseLeave } = useTimer({
    id: item.id!,
    duration: item.duration,
    remove: item.onClose!,
  });
  return (
    <div
      className="message-item"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {
        <span style={{ fontSize: 14, marginRight: 8 }}>
          {getIcon(item.type)}
        </span>
      }
      {item.content}
    </div>
  );
};

export const MessageProvider = forwardRef<MessageRef, {}>((props, ref) => {
  const { messageList, add, update, remove, clearAll } = useMessageStore("top");

  if ("current" in ref!) {
    ref.current = {
      add,
      update,
      remove,
      clearAll,
    };
  }

  const positions = Object.keys(messageList) as Position[];

  const messageWrapper = (
    <div className="message-wrapper">
      {positions.map((direction) => {
        return (
          <TransitionGroup
            className={`message-wrapper-${direction}`}
            key={direction}
          >
            {messageList[direction].map((item) => {
              return (
                <CSSTransition
                  key={item.id}
                  timeout={1000}
                  classNames="message"
                >
                  <MessageItem onClose={remove} {...item}></MessageItem>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        );
      })}
    </div>
  );

  const element = useMemo(() => {
    const el = document.createElement("div");
    el.style.height = "100%";
    el.style.width = "100%";
    document.body.appendChild(el);
    return el;
  }, []);

  return createPortal(messageWrapper, element);
});

const getIcon = (type: Type) => {
  switch (type) {
    case "info":
      return <ExclamationCircleFilled style={{ color: "#0071f9" }} />;
    case "success":
      return <CheckCircleFilled style={{ color: "#41ba30" }} />;
    case "warn":
      return <WarningFilled style={{ color: "#fda12a" }} />;
    case "error":
      return <CloseCircleFilled style={{ color: "red" }} />;
    case "loading":
      return <LoadingOutlined style={{ color: "#0071f9" }} />;
  }
};
