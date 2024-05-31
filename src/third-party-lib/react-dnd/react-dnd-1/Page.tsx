import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TargetContainer from "./TargetContainer";
import SourceContainer from "./SourceContainer";
import { useEffect, useState } from "react";
import { SwapOutlined } from "@ant-design/icons";
import { uniqObjArr } from "../../../common/utils";
import { useLocalStorageState } from "ahooks";

const AverageDndStorageKey = "average_DndStorage_Key";

export interface ItemType {
  color: string;
  id: number;
}

interface DndDataType {
  source: ItemType[];
  target: ItemType[];
}
const initialColors = ["red", "gold", "skyblue", "yellowgreen", "purple"];
const initialBoxes = initialColors.map(
  (color, index) => ({ color: color, id: index + 1 } as ItemType)
);

const initialState: DndDataType = {
  source: initialBoxes,
  target: [],
};

const DndPage1: React.FC = () => {
  const [localStorage, setLocalStorage] = useLocalStorageState<DndDataType>(
    AverageDndStorageKey,
    { defaultValue: initialState }
  );
  const [stateboxs, setBoxes] = useState<DndDataType>(
    localStorage ?? ({} as DndDataType)
  );

  //本地持久化缓存
  useEffect(() => {
    setLocalStorage(stateboxs);
  }, [setLocalStorage, stateboxs]);

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 30 }}>
      <DndProvider backend={HTML5Backend}>
        <SourceContainer
          data={localStorage?.source ?? stateboxs.source}
          onChange={(item) => {
            setBoxes((stateboxs) => ({
              source: uniqObjArr([...stateboxs.source, item], "color"),
              target: stateboxs.target.filter((v) => v.id !== item.id),
            }));
          }}
        />
      </DndProvider>
      <SwapOutlined style={{ fontSize: 24, color: "#00000090" }} />
      <DndProvider backend={HTML5Backend}>
        <TargetContainer
          data={localStorage?.target ?? stateboxs.target}
          onChange={(item) => {
            setBoxes((stateboxs) => ({
              source: stateboxs.source.filter((v) => v.id !== item.id),
              target: uniqObjArr([...stateboxs.target, item], "color"),
            }));
          }}
        />
      </DndProvider>
    </div>
  );
};

export default DndPage1;
