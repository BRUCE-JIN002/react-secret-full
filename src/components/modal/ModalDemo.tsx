/* eslint-disable react/jsx-max-props-per-line */
import { FC, useMemo, useState } from "react";
import Modal from "./Modal";

import "./style.scss";
import { Button, Input } from "antd";

/* 挂载方式调用modal */
const ModalDemo: FC = () => {
  const [visible, setVisible] = useState(false);
  const [nameShow, setNameShow] = useState(false);
  const [value, setValue] = useState("");
  const handleClick = () => {
    setVisible(!visible);
    setNameShow(!nameShow);
  };
  /* 防止 Model 的 PureComponent 失去作用 */
  const [handleClose, handleOk, handleCancel] = useMemo(() => {
    const Ok = () => {
      setVisible(false);
      console.log("点击确定按钮");
    };
    const Close = () => setVisible(false);
    const Cancel = () => {
      setVisible(false);
      console.log("点击取消按钮");
    };
    return [Close, Ok, Cancel];
  }, []);

  /** 使用静态方法打开Modal */
  const handleStaticClick = () => {
    Modal.show({
      content: <p>这是静态方法打开模态框</p>,
      title: "Modal 静态方法测试",
      onOk: () => {
        Modal.hidden();
        console.log("点击确定");
      },
      onCancel: () => {
        Modal.hidden();
        console.log("点击取消");
      },
      onClose: () => Modal.hidden(),
    });
  };

  return (
    <div style={{ display: "flex", gap: 12 }}>
      <Button
        type="primary"
        onClick={() => {
          setVisible(!visible);
          setNameShow(false);
        }}
      >
        show model
      </Button>
      <Button onClick={handleClick}> show model ( 显示作者 ) </Button>

      <Button type="dashed" onClick={() => handleStaticClick()}>
        静态方式调用，显示modal
      </Button>

      <Modal
        onCancel={handleCancel}
        onClose={handleClose}
        onOk={handleOk}
        title={"Modal 的实现"}
        visible={visible}
        width={700}
      >
        <div className="feel">
          说出你的感受：
          <Input.TextArea
            placeholder="请在这里写下你的感受"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {nameShow && <p>author: i am not alien</p>}
        </div>
      </Modal>
    </div>
  );
};

export default ModalDemo;
