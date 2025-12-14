import { FC } from "react";
import { useToggle } from "ahooks";
import { Radio } from "antd";

import { MenuKey } from "../App";

interface Iprops {
  currentPage?: MenuKey;
}

const CustomHooks: FC<Iprops> = (props) => {
  const { currentPage } = props;
  const [current, setCurrent] = useToggle("doc", "demo");

  return (
    <div className="h-full w-full">
      <div
        style={{
          position: "sticky",
          padding: "4px",
        }}
      >
        <Radio.Group value={current} onChange={(e) => setCurrent.toggle()}>
          <Radio.Button value="doc">doc</Radio.Button>
          <Radio.Button value="demo">demo</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
};

export default CustomHooks;
