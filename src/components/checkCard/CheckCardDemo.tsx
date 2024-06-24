import React from "react";
import CheckCard from "./index";
import { Button, message } from "antd";

const avatarSrc =
  "https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg";

const Index: React.FC = () => {
  return (
    <div style={{ flex: "none" }}>
      <h1>基本操作</h1>
      <CheckCard
        avatar={avatarSrc}
        title="默认选中 Check Card"
        description="大家好，欢迎来到我的组建乐园，让我们一起开始学习吧"
        defaultChecked
        onChange={(checked) => {
          console.log("checked", checked);
        }}
        onClick={() => {
          console.log("点击");
        }}
      />
      <CheckCard
        avatar={avatarSrc}
        title="禁用"
        description="大家好，欢迎来到我的组建乐园，让我们一起开始学习吧"
        disabled
      />
      <CheckCard
        avatar={avatarSrc}
        title="禁用选中"
        description="大家好，欢迎来到我的组建乐园，让我们一起开始学习吧"
        defaultChecked
        disabled
      />
      <h1>额外操作</h1>
      <CheckCard
        avatar={avatarSrc}
        extra={
          <Button
            type="link"
            onClick={(e) => {
              e.stopPropagation();
              message.info("记得阻止事件冒泡");
            }}
          >
            操作
          </Button>
        }
        title="多选卡片"
        description="大家好，欢迎来到我的组建乐园，让我们一起开始学习吧"
      />
      <h1>加载状态</h1>
      <CheckCard
        avatar={avatarSrc}
        title="多选卡片"
        description="大家好，欢迎来到我的组建乐园"
        loading
      />
      <h1>Group基本使用</h1>
      <CheckCard.Group
        initValue={"A"}
        multiple
        onChange={(data) => {
          console.log(data, "状态改变");
        }}
      >
        <CheckCard
          title="Card A"
          description="让我们一起开始学习吧"
          value="A"
        />
        <CheckCard
          title="Card B"
          description="让我们一起开始学习吧"
          value="B"
        />
        <CheckCard
          title="Card C"
          description="让我们一起开始学习吧"
          value="C"
        />
        <CheckCard
          title="Card D"
          disabled
          description="让我们一起开始学习吧"
          value="D"
        />
      </CheckCard.Group>
      <h1>集中控制 Loading：</h1>
      <CheckCard.Group loading>
        <CheckCard
          title="Card A"
          description="让我们一起开始学习吧"
          value="A"
        />
        <CheckCard
          title="Card B"
          description="让我们一起开始学习吧"
          value="B"
        />
        <CheckCard
          title="Card C"
          description="让我们一起开始学习吧"
          value="C"
        />
      </CheckCard.Group>
    </div>
  );
};

export default Index;
