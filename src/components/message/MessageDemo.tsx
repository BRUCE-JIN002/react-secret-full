import { Button, Space, ConfigProvider as AntConfigProvider } from "antd";
import { ConfigProvider } from "./ConfigProvider";
import { useMessage } from "./useMessage";
import { TinyColor } from "@ctrl/tinycolor";

const colors1 = ["#6253E1", "#04BEFE"];
const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];
const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

function Test() {
  const message = useMessage();

  return (
    <Space size={20}>
      <AntConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: "#30b039",
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
              colorPrimary: "red",
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
      <AntConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: `linear-gradient(135deg, ${colors1.join(", ")})`,
              colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
                colors1
              ).join(", ")})`,
              colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                colors1
              ).join(", ")})`,
              lineWidth: 0,
            },
          },
        }}
      >
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
      </AntConfigProvider>
      <AntConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: `linear-gradient(90deg,  ${colors2.join(", ")})`,
              colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(
                colors2
              ).join(", ")})`,
              colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(
                colors2
              ).join(", ")})`,
              lineWidth: 0,
            },
          },
        }}
      >
        <Button
          type="primary"
          size="large"
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
      </AntConfigProvider>
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
