import { Button, Space } from "antd";
import { ConfigProvider } from "./ConfigProvider";
import { useMessage } from "./useMessage";

function Test() {
  const message = useMessage();

  return (
    <Space>
      <Button
        type="primary"
        ghost={true}
        onClick={() => {
          message.add({
            content: "This is a success message !",
            position: "top",
            type: "success",
          });
        }}
      >
        Success
      </Button>
      <Button
        type="primary"
        ghost={true}
        onClick={() => {
          message.add({
            content: "This is an error message !",
            position: "top",
            type: "error",
          });
        }}
      >
        Error
      </Button>
      <Button
        type="primary"
        ghost={true}
        onClick={() => {
          message.add({
            content: "This is a warning message !",
            position: "top",
            type: "warn",
          });
        }}
      >
        Warning
      </Button>
      <Button
        type="primary"
        ghost={true}
        onClick={() => {
          message.add({
            content: "This is an info message !",
            position: "top",
            type: "info",
          });
        }}
      >
        Info
      </Button>
      <Button
        type="primary"
        ghost={true}
        onClick={() => {
          const id = message.add({
            content: "Loading...",
            position: "top",
            type: "loading",
          });
          setTimeout(() => {
            message.update(id, {
              type: "success",
              content: "Loaded!",
            });
          }, 1000);
        }}
      >
        Loading
      </Button>
    </Space>
  );
}

function MessageDemo() {
  return (
    <ConfigProvider>
      <Test />
    </ConfigProvider>
  );
}

export default MessageDemo;
