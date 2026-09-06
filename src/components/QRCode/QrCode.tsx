import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, QRCode } from "antd";
import React, { useState } from "react";

const MyQRcode: React.FC = () => {
  const [size, setSize] = useState<number>(220);

  const increase = () => {
    setSize((prevSize) => {
      const newSize = prevSize + 20;
      if (newSize > 600) {
        return 600;
      }
      return newSize;
    });
  };

  const decline = () => {
    setSize((prevSize) => {
      const newSize = prevSize - 20;
      if (newSize < 200) {
        return 200;
      }
      return newSize;
    });
  };
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        flexWrap: "wrap",
        gap: 24,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <QRCode
        errorLevel="H"
        size={size}
        iconSize={size / 4}
        value="https://react.dev"
        color="#253c62"
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",

          padding: "0px 8px",
          width: 190,
          backgroundColor: "#fff",

        }}
      >
        <span style={{ fontSize: 14 }}>大小：</span>
        <Button.Group>
          <Button
            size="small"
            type="primary"
            onClick={decline}
            disabled={size <= 200}
            aria-label="缩小二维码"
            icon={<MinusOutlined />}
            style={{ width: 45 }}
          />
          <Button
            type="primary"
            size="small"
            onClick={increase}
            disabled={size >= 600}
            aria-label="放大二维码"
            icon={<PlusOutlined />}
            style={{ width: 45 }}
          />
        </Button.Group>
      </div>
    </div>
  );
};

export default MyQRcode;
