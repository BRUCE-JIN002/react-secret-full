import React, { CSSProperties, useEffect, useState } from "react";
import { getMaskStyle } from "./getMaskStyle";
import { useMount } from "ahooks";

interface MaskProps {
  element: HTMLElement;
  container?: HTMLElement;
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
  renderMaskContent?: (wrapper: React.ReactNode) => React.ReactNode;
}

export const Mask: React.FC<MaskProps> = (props) => {
  const {
    element,
    container,
    renderMaskContent,
    onAnimationStart,
    onAnimationEnd,
  } = props;
  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    onAnimationStart?.();
    const timer = window.setTimeout(() => {
      onAnimationEnd?.();
    }, 200);
    return () => window.clearTimeout(timer);
  }, [element]);

  useMount(() => {
    const parentContainer = container || document.documentElement;
    const observer = new ResizeObserver(() => {
      const style = getMaskStyle(element, parentContainer);
      setStyle(style);
    });
    observer.observe(parentContainer);
  });

  useEffect(() => {
    if (!element) {
      return;
    }
    element.scrollIntoView({
      block: "center",
      inline: "center",
    });
    const style = getMaskStyle(element, container ?? document.documentElement);
    setStyle(style);
  }, [element, container]);

  const getContent = () => {
    if (!renderMaskContent) {
      return null;
    }
    return renderMaskContent(<div className="mask-content" />);
  };

  return (
    <div style={style} className="mask">
      {getContent()}
    </div>
  );
};
