import { useState } from "react";
import SlideInOverlay from "./SlideInOverlay";
import { Button, message } from "antd";
import facai from "../../assets/image/facai.png";

const SlidInOverlayDemo = () => {
  const [show, setShow] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={() => setShow(true)}>
        开启
      </Button>
      <SlideInOverlay
        isVisible={show}
        from="bottom"
        duration={350}
        style={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
        onEnter={() => {
          messageApi.open({
            type: "success",
            content: "onEnter回调执行!",
            duration: 1.5,
          });
        }}
        onLeave={() => {
          messageApi.open({
            type: "success",
            content: "onLeave回调执行!",
            duration: 1.5,
          });
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(5px)",
          }}
        >
          <Button size="small" type="text" onClick={() => setShow(false)}>
            关闭
          </Button>
        </div>
        <img style={{ height: "100%", width: "100%" }} src={facai} alt="" />
      </SlideInOverlay>
    </>
  );
};

export default SlidInOverlayDemo;
