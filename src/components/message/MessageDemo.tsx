import { Button, Space, ConfigProvider as AntConfigProvider } from "antd";
import { ConfigProvider } from "./ConfigProvider";
import { useMessage } from "./useMessage";

function Test() {
  const message = useMessage();

  return (
    <Space size={20}>
      <AntConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: "#30b039",
              colorPrimaryHover: "#30b03990",
              colorPrimaryActive: "#30b039",
            },
          },
        }}
      >
        <Button
          type="primary"
          size="large"
          ghost
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
      </AntConfigProvider>
      <AntConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: "#ff000c",
              colorPrimaryHover: "#ff000c90",
              colorPrimaryActive: "#ff000c",
            },
          },
        }}
      >
        <Button
          type="primary"
          size="large"
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
      </AntConfigProvider>
      <AntConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: "#ff9533",
              colorPrimaryHover: "#ff953390",
              colorPrimaryActive: "#ff9533",
            },
          },
        }}
      >
        <Button
          type="primary"
          ghost={true}
          size="large"
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
      </AntConfigProvider>
      <Button
        type="primary"
        size="large"
        onClick={() => {
          message.add({
            content: "This is an info message !",
            position: "top",
            type: "info",
          });
        }}
      >
        Infomation
      </Button>
      <Button
        type="primary"
        size="large"
        ghost
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
