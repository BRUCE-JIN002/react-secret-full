import React, { CSSProperties, useState } from "react";
import Space, { SpaceProps } from "./Space";
import { ConfigProvider } from "./ConfigProvider";
import { useToggle } from "ahooks";
import { Button, Radio, Switch } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import "./styles.scss";
import "./SpaceDemo.scss";

const getSplitStyle = (direction: SpaceProps["direction"]): CSSProperties => {
  if (direction === "horizontal") {
    return { width: 0, height: 100, borderLeft: "1px dashed blue" };
  } else {
    return { width: 100, height: 0, borderTop: "1px dashed blue" };
  }
};

const SpaceDemo: React.FC = () => {
  const [direction, setDirection] = useToggle("horizontal", "vertical");
  const [stateWrap, setWrap] = useToggle<boolean>(false);
  const [stateSplit, setSplit] = useToggle<boolean>(true);
  const [stateSize, setSize] = useState<number>(20);

  const increase = () => {
    setSize((prevSize) => {
      const newSize = prevSize + 5;
      if (newSize > 50) {
        return 50;
      }
      return newSize;
    });
  };

  const decline = () => {
    setSize((prevSize) => {
      const newSize = prevSize - 5;
      if (newSize < 10) {
        return 10;
      }
      return newSize;
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        position: "relative",
        gap: 28,
        width: "100%",
        minWidth: 0,
        maxWidth: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "center",
          alignItems: "self-start",
          position: "relative",
          width: "100%",
          borderBottom: "1px solid #efefef",
          padding: 8,
          backgroundColor: "#fff",
        }}
      >
        <div>
          <span style={{ fontSize: 14 }}>方向：</span>
          <Radio.Group value={direction} onChange={() => setDirection.toggle()}>
            <Radio value={"vertical"}>垂直</Radio>
            <Radio value={"horizontal"}>水平</Radio>
          </Radio.Group>
        </div>
        <div>
          <span style={{ fontSize: 14 }}>是否换行：</span>
          <Switch
            value={stateWrap}
            onChange={() => setWrap.toggle()}
            checkedChildren="yes"
            unCheckedChildren="no"
            defaultChecked
            style={{ width: 50 }}
          />
        </div>
        <div>
          <span style={{ fontSize: 14 }}>分割线：</span>
          <Switch
            value={stateSplit}
            onChange={() => setSplit.toggle()}
            checkedChildren="yes"
            unCheckedChildren="no"
            defaultChecked
            style={{ width: 50 }}
          />
        </div>
        <div>
          <span style={{ fontSize: 14 }}>间距：</span>
          <Button.Group>
            <Button
              size="small"
              type="primary"
              onClick={decline}
              disabled={stateSize <= 10}
              icon={<MinusOutlined />}
              style={{ width: 45 }}
            />
            <Button
              size="small"
              type="primary"
              onClick={increase}
              disabled={stateSize >= 50}
              icon={<PlusOutlined />}
              style={{ width: 45 }}
            />
          </Button.Group>
        </div>
      </div>
      <div
        className="containerWrapper"
        style={{
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          boxSizing: "border-box",
          overflow: "auto",
          maxHeight: "min(420px, calc(100vh - 180px))",
        }}
      >
        <ConfigProvider space={{ size: stateSize }}>
          <Space
            direction={direction as SpaceProps["direction"]}
            wrap={stateWrap}
            className={stateWrap ? "space-demo-wrap" : undefined}
            split={
              stateSplit ? (
                <div
                  style={getSplitStyle(direction as SpaceProps["direction"])}
                />
              ) : null
            }
          >
            <div className="boxs" />
            <div className="boxs" />
            <div className="boxs" />
            <div className="boxs" />
          </Space>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default SpaceDemo;
