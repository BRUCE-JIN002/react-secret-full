import { useState } from "react";
import SlideInOverlay from "./SlideInOverlay";
import { Button, message } from "antd";

const SlidInOverlayDemo = () => {
  const [show, setShow] = useState(false);
  const [from, setFrom] = useState<"bottom" | "right">("bottom");
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            setFrom("bottom");
            setShow(true);
          }}
        >
          Bottom
        </Button>
        {contextHolder}
        <Button
          type="primary"
          onClick={() => {
            setFrom("right");
            setShow(true);
          }}
        >
          Right
        </Button>
      </div>
      <SlideInOverlay
        isVisible={show}
        from={from}
        duration={350}
        style={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
        }}
        onEnter={() => {
          messageApi.open({
            type: "success",
            content: "onEnter回调执行!",
            duration: 1.5
          });
        }}
        onLeave={() => {
          messageApi.open({
            type: "success",
            content: "onLeave回调执行!",
            duration: 1.5
          });
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            background: "rgba(115, 210, 114, 0.15)",
            backdropFilter: "blur(5px)"
          }}
        >
          <Button size="small" type="text" onClick={() => setShow(false)}>
            关闭
          </Button>
        </div>
      </SlideInOverlay>
    </>
  );
};

export default SlidInOverlayDemo;
