import Watermark from "./index";

const WatermarkDemo = () => {
  return (
    <Watermark
      content={["测试水印组件"]}
      gap={[50, 50]}
      offset={[0, 0]}
      fontStyle={{
        color: "#e0e0e0",
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <div style={{ height: "100%" }}></div>
    </Watermark>
  );
};

export default WatermarkDemo;
