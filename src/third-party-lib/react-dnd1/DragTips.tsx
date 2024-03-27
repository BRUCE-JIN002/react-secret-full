import { PlusOutlined } from "@ant-design/icons";
import React from "react";

const DragTip: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        pointerEvents: "none",
        opacity: 0.5,
      }}
    >
      <div
        style={{
          margin: "auto",
          border: "2px dashed #00000050",
          height: "40%",
          aspectRatio: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PlusOutlined style={{ fontSize: 20, opacity: 0.5 }} />
        <div style={{ fontSize: 12 }}>拖放到此</div>
      </div>
    </div>
  );
};

export default DragTip;
