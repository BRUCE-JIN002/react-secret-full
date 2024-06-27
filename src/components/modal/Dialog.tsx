import { PropsWithChildren, useEffect, useState } from "react";
import ReactDOM from "react-dom";

/* 控制弹窗隐藏以及动画效果 */
const controlShow = (
  fn1: Function,
  fn2: Function,
  value: boolean,
  timer: number
) => {
  fn1(value);
  return setTimeout(() => {
    fn2(value);
  }, timer);
};

interface RenderChildrenProps extends PropsWithChildren {
  modelShow: boolean;
  modelShowAync: boolean;
}

const RenderChildren = (props: RenderChildrenProps) => {
  /* 把元素渲染到组件之外的 document.body 上  */
  return ReactDOM.createPortal(props.children, document.body);
};

interface DialogProps extends PropsWithChildren {
  closeCb?: () => void;
  onClose?: () => void;
  visible: boolean;
  width?: number;
}

const Dialog: React.FC<DialogProps> = (props) => {
  const { width, visible, closeCb, onClose, children } = props;
  /* 控制 modelShow 动画效果 */
  const [modelShow, setModelShow] = useState(visible);
  const [modelShowAync, setModelShowAync] = useState(visible);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (visible) {
      timer = controlShow(setModelShow, setModelShowAync, visible, 30);
    } else {
      timer = controlShow(setModelShowAync, setModelShow, visible, 1000);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [visible]);

  useEffect(() => {
    !modelShow && closeCb?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelShow]);

  return (
    <RenderChildren modelShow={modelShow} modelShowAync={modelShowAync}>
      <div style={{ display: modelShow ? "block" : "none" }}>
        <div
          className="model_container scaleAnimation"
          style={{ opacity: modelShowAync ? 1 : 0 }}
        >
          <div className="model_wrap">
            <div style={{ width: `${width}px` }}>{children}</div>
          </div>
        </div>
        <div
          className="model_container mast"
          onClick={() => onClose && onClose()}
          style={{ opacity: modelShowAync ? 0.6 : 0 }}
        />
      </div>
    </RenderChildren>
  );
};

export default Dialog;
