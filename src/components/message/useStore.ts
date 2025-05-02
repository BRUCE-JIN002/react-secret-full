import { useState } from "react";
import { MessageProps, Position } from "./index";

type MessageList = {
  top: MessageProps[];
  bottom: MessageProps[];
};

const initialState = {
  top: [],
  bottom: []
};

function useMessageStore(defaultPostion: Position) {
  const [messageList, setMessageList] = useState<MessageList>({
    ...initialState
  });

  const add = (messageProps: MessageProps) => {
    const id = getId(messageProps);
    setMessageList((preState) => {
      if (messageProps?.id) {
        const position = getMessagePosition(preState, messageProps.id);
        if (position) {
          return preState;
        }
      }
      const position = messageProps.position ?? defaultPostion;
      const isTop = position.includes("top");
      const message = isTop
        ? [{ ...messageProps, id }, ...(preState[position] ?? [])]
        : [...(preState[position] ?? []), { ...messageProps, id }];

      return {
        ...preState,
        [position]: message
      };
    });
    return id;
  };

  const update = (id: number, messageProps: MessageProps) => {
    if (!id) return;

    setMessageList((preState) => {
      const nextState = { ...preState };
      const { position, index } = findMessage(nextState, id);

      if (position && index !== -1) {
        nextState[position][index] = {
          ...nextState[position][index],
          ...messageProps
        };
      }
      return nextState;
    });
  };

  const remove = (id: number) => {
    setMessageList((preState) => {
      const position = getMessagePosition(preState, id);
      if (!position) return preState;
      return {
        ...preState,
        [position]: preState[position].filter((notice) => notice.id !== id)
      };
    });
  };

  const clearAll = () => {
    setMessageList({ ...initialState });
  };

  return {
    messageList,
    add,
    update,
    remove,
    clearAll
  };
}

let count = 1;
export const getId = (messageProps: MessageProps) => {
  if (messageProps.id) {
    return messageProps.id;
  }
  count += 1;
  return count;
};

export const getMessagePosition = (messageList: MessageList, id: number) => {
  for (const [positon, list] of Object.entries(messageList)) {
    if (list.find((item) => item.id === id)) {
      return positon as Position;
    }
  }
};

export const findMessage = (messageList: MessageList, id: number) => {
  const position = getMessagePosition(messageList, id);

  const index = position
    ? messageList[position].findIndex((item) => item.id === id)
    : -1;

  return {
    position,
    index
  };
};

export default useMessageStore;
