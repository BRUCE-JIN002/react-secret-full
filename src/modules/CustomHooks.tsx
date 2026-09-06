import { FC } from "react";
import { useToggle } from "ahooks";

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
    <div className="hook-layout">
      <div className="document-tabs" aria-label="内容视图">
        <button className={current === "doc" ? "active" : ""} aria-pressed={current === "doc"} onClick={() => setCurrent.setLeft()}>使用文档</button>
        <button className={current === "demo" ? "active" : ""} aria-pressed={current === "demo"} onClick={() => setCurrent.setRight()}>交互演示</button>
      </div>
      <div className="document-body">{current === "doc" ? <NotePreview>{rendererConfig.doc}</NotePreview> : <div className="p-6">{rendererConfig.demo || <div className="text-center text-gray-500 py-8">暂无演示内容</div>}</div>}</div>
    </div>
  );
};
export default CustomHooks;
