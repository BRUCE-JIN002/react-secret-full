import { FC } from "react";
import { useToggle } from "ahooks";
import { Radio } from "antd";
import { MenuKey } from "../App";
import { hookMap } from "../constants/hookDisplayConfig";
import { HooksType } from "../menu/Menu";
import NotePreview from "../common/components/NotePreview";

interface Iprops {
  currentPage?: MenuKey;
}

const CustomHooks: FC<Iprops> = (props) => {
  const { currentPage = HooksType.UseCookies } = props;
  const [current, setCurrent] = useToggle("doc", "demo");
  const isHookPage = currentPage && currentPage in hookMap;
  const rendererConfig = isHookPage ? hookMap[currentPage as HooksType] : null;

  if (!isHookPage || !rendererConfig) {
    return null;
  }

  return (
    <div className="h-full w-full">
      <div
        style={{
          position: "sticky",
          padding: "4px",
        }}
      >
        <Radio.Group value={current} onChange={() => setCurrent.toggle()}>
          <Radio.Button value="doc">文档</Radio.Button>
          <Radio.Button value="demo">演示</Radio.Button>
        </Radio.Group>
      </div>

      <div className="flex-1 overflow-auto max-h-full">
        {current === "doc" ? (
          <NotePreview>{rendererConfig.doc}</NotePreview>
        ) : (
          <div className="p-4">
            {rendererConfig.demo || (
              <div className="text-center text-gray-500 py-8">暂无演示内容</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomHooks;
