import React, {
  CSSProperties,
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";
import Dialog from "./Dialog";
import { Button } from "antd";
import "./style.scss";

interface ModalProps extends PropsWithChildren {
  onOk?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onCancel?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  cancelText?: ReactNode;
  okText?: ReactNode;
  footer?: ReactNode;
  title?: ReactNode;
  content?: ReactNode;
  visible: boolean;
  width?: number;
  style?: CSSProperties;
  className?: string | string[];
  onClose?: () => void;
  closeCb?: () => void;
}

class Modal extends React.PureComponent<ModalProps> {
  static show: (v: Partial<ModalProps>) => void;
  static hidden: () => void;
  /* 渲染底部按钮 */
  renderFooter = () => {
    const { onOk, onCancel, cancelText, okText, footer, width } = this.props;
    /* 触发 onOk / onCancel 回调  */
    if (footer && React.isValidElement(footer)) return footer;
    return (
      <div className="flex justify-end gap-2 p-2 mr-[15px]">
        <Button
          size="small"
          type="primary"
          onClick={(e) => {
            onOk && onOk(e);
          }}
        >
          {okText || "确定"}
        </Button>
        <Button
          size="small"
          onClick={(e) => {
            onCancel && onCancel(e);
          }}
        >
          {cancelText || "取消"}
        </Button>
      </div>
    );
  };

  /* 渲染顶部 */
  renderTop = () => {
    const { title, onClose } = this.props;
    return (
      <div className="model_top">
        <p>{title}</p>
        <span className="model_top_close" onClick={() => onClose?.()}>
          x
        </span>
      </div>
    );
  };

  /* 渲染弹窗内容 */
  renderContent() {
    const { content, children } = this.props;
    return React.isValidElement(content) ? content : children ? children : null;
  }

  render() {
    const { visible, width = 500, closeCb, onClose } = this.props;
    return (
      <Dialog
        closeCb={closeCb}
        onClose={onClose}
        visible={visible}
        width={width}
      >
        {this.renderTop()}
        {this.renderContent()}
        {this.renderFooter()}
      </Dialog>
    );
  }
}

let ModalContainer: HTMLElement | null = null;
const modelSysbol: Symbol = Symbol("$$__model__Container_hidden");

/* 静态属性 */
Modal.show = function (config) {
  /* 如果modal已经存在了，那么就不需要第二次show */
  if (ModalContainer) return;
  const props = { ...config, visible: true };
  const container = (ModalContainer = document.createElement("div"));
  /* 创建一个管理者，管理model状态 */
  const manager: {
    setShow: Dispatch<SetStateAction<boolean>> | null;
    mounted: boolean;
    hidden: VoidFunction;
    destory: VoidFunction;
    //@ts-ignore
  } = (container[modelSysbol] = {
    setShow: null,
    mounted: false,
    hidden() {
      const { setShow } = manager;
      setShow && setShow(false);
    },
    destory() {
      /* 卸载组件 */
      ReactDOM.unmountComponentAtNode(container);
      /* 移除节点 */
      document.body.removeChild(container);
      /* 置空元素 */
      ModalContainer = null;
    },
  });

  const ModelApp = (props: ModalProps) => {
    const [show, setShow] = useState(false);
    manager.setShow = setShow;
    const { visible, ...restProps } = props;
    useEffect(() => {
      /* 加载完成，设置状态 */
      manager.mounted = true;
      setShow(visible);
    }, [visible]);
    return (
      <Modal
        {...restProps}
        closeCb={() => manager.mounted && manager.destory()}
        visible={show}
      />
    );
  };
  /* 插入到body中 */
  document.body.appendChild(container);
  /* 渲染React元素 */
  ReactDOM.render(<ModelApp {...props} />, container);
  // return manager;
};

/* 静态属性 */
Modal.hidden = function () {
  if (!ModalContainer) return;
  /* 如果存在 ModalContainer 那么隐藏 ModalContainer  */
  //@ts-ignore
  ModalContainer[modelSysbol] && ModalContainer[modelSysbol].hidden();
};

export default Modal;
