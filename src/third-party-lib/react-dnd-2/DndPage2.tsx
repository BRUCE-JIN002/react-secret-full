import { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./index.scss";
import Card, { CardItem } from "./Card";
import { useLocalStorageState } from "ahooks";
import _ from "lodash";

const intialList: { id: number; content: string }[] = _.range(5).map(
  (index) => ({
    id: index,
    content: `${index}`,
  })
);

const DndPage2: React.FC = () => {
  //本地持久化
  const [storedList, setStoredList] = useLocalStorageState<CardItem[]>(
    "stored-dnd-status",
    {
      defaultValue: intialList,
    }
  );

  const [cardList, setCardList] = useState<CardItem[]>(storedList ?? []);

  const swapIndex = useCallback(
    (index1: number, index2: number) => {
      [cardList[index1], cardList[index2]] = [
        cardList[index2],
        cardList[index1],
      ];
      setCardList([...cardList]);
      setStoredList([...cardList]);
    },
    [cardList, setStoredList]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>拖拽排序</h2>
      <DndProvider backend={HTML5Backend}>
        <div className="card-list">
          {cardList.map((item: CardItem, index) => (
            <Card
              key={`card_${item.id}`}
              data={item}
              index={index}
              swapIndex={swapIndex}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default DndPage2;
