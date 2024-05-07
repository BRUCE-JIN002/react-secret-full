import React from "react";
import { Button, Flex } from "antd";
import OnBoarding from "./index";
import "./index.scss";

const OnBoardingDemo: React.FC = () => {
  return (
    <div>
      <div style={{ height: 250 }} />
      <Flex gap="small" wrap="wrap" id="btn-group1">
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Flex>

      <div style={{ height: 300 }} />

      <Flex wrap="wrap" gap="small">
        <Button type="primary" danger>
          Primary
        </Button>
        <Button danger>Default</Button>
        <Button type="dashed" danger id="btn-group2">
          Dashed
        </Button>
        <Button type="text" danger>
          Text
        </Button>
        <Button type="link" danger>
          Link
        </Button>
      </Flex>

      <div style={{ height: 300 }} />

      <Flex wrap="wrap" gap="large">
        <Button type="primary" ghost>
          Primary
        </Button>
        <Button type="primary">Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="primary" danger ghost id="btn-group3">
          Danger
        </Button>
      </Flex>

      <OnBoarding
        steps={[
          {
            selector: () => {
              return document.getElementById("btn-group1");
            },
            renderContent: () => {
              return (
                <div style={{ width: 450, height: 120 }}>
                  <img
                    src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
                    alt=""
                  />
                </div>
              );
            },
            placement: "top",
          },
          {
            selector: () => {
              return document.getElementById("btn-group2");
            },
            renderContent: () => {
              return (
                <div style={{ width: 450, height: 100 }}>
                  <div style={{ fontWeight: "bold", marginBottom: 8 }}>
                    Save your change
                  </div>
                  <p>Put your files here.</p>
                </div>
              );
            },
            placement: "top",
          },
          {
            selector: () => {
              return document.getElementById("btn-group3");
            },
            renderContent: () => {
              return (
                <div style={{ width: 300, height: 90 }}>你觉得结束了吗？</div>
              );
            },
            placement: "top",
          },
        ]}
      />
    </div>
  );
};

export default OnBoardingDemo;
