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
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <QRCode
        errorLevel="H"
        size={size}
        iconSize={size / 4}
        value="WIFI:T:WPA;P:pnkzcv7s;S:ChinaNet-FaxU;H:false;"
        color="#07c941"
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          borderLeft: "1px solid #efefef",
          padding: "0px 8px",
          width: 190,
          backgroundColor: "#fff",
          zIndex: 99,
        }}
      >
        <span style={{ fontSize: 14 }}>大小：</span>
        <Button.Group>
          <Button
            size="small"
            type="primary"
            onClick={decline}
            disabled={size <= 200}
            icon={<MinusOutlined />}
            style={{ width: 45 }}
          />
          <Button
            type="primary"
            size="small"
            onClick={increase}
            disabled={size >= 600}
            icon={<PlusOutlined />}
            style={{ width: 45 }}
          />
        </Button.Group>
      </div>
    </div>
  );
};

export default MyQRcode;
