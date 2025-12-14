import React, {
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Button, Flex, Popover } from "antd";
import { Mask } from "./Mask";
import { TooltipPlacement } from "antd/es/tooltip";
import { useMount } from "ahooks";
import classNames from "classnames";
import { CloseOutlined } from "@ant-design/icons";
import "./index.scss";
import useUpdate from "../../hooks/useForceUpdate";

export interface OnBoardingStepConfig {
  placement?: TooltipPlacement;
  selector: () => HTMLElement | null;
  beforeBack?: (currentStep: number) => void;
  beforeForward?: (currentStep: number) => void;
  renderContent?: (currentStep: number) => React.ReactNode;
}

export interface OnBoardingProps {
  step?: number;
  steps: OnBoardingStepConfig[];
  onStepsEnd?: () => void;
  getContainer?: () => HTMLElement;
}

export interface BoardingRef {
  reStart(): void;
}

const OnBoarding: ForwardRefRenderFunction<BoardingRef, OnBoardingProps> = (
  props,
  ref
) => {
  const { step = 0, steps, onStepsEnd, getContainer } = props;
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [done, setDone] = useState(false);
  const [isMaskMoving, setIsMaskMoving] = useState(false);
  const currentSelectedElement = steps[currentStep]?.selector();
  const currentContainerElement = getContainer?.() || document.documentElement;

  const getCurrentStep = () => {
    return steps[currentStep];
  };

  const back = () => {
    if (currentStep === 0) {
      return;
    }
    const { beforeBack } = getCurrentStep();
    beforeBack?.(currentStep);
    setCurrentStep(currentStep - 1);
  };

  const forward = () => {
    if (currentStep === steps.length - 1) {
      onStepsEnd?.();
      setDone(true);
      return;
    }
    const { beforeForward } = getCurrentStep();
    beforeForward?.(currentStep);
    setCurrentStep(currentStep + 1);
  };

  const terminate = () => {
    onStepsEnd?.();
    setDone(true);
    return;
  };

  useEffect(() => {
    setCurrentStep(step!);
  }, [step]);

  const renderPopover = (wrapper: React.ReactNode) => {
    const config = getCurrentStep();
    if (!config) {
      return wrapper;
    }

    const { renderContent } = config;
    const content = renderContent ? renderContent(currentStep) : null;

    const stepIndicator = () =>
      steps.map((step, index) => (
        <div
          key={index}
          className={classNames(
            "rounded-full h-[6px] w-[6px] bg-[#e0e0e0] ml-[6px]",
            { "bg-blue-400": index === currentStep }
          )}
        />
      ));

    const operation = (
      <div className="onboarding-operation">
        <div className="flex justify-around items-center">
          {stepIndicator()}
        </div>
        <div>
          {currentStep !== 0 && (
            <Button size="small" onClick={() => back()}>
              上一步
            </Button>
          )}
          <Button
            type="primary"
            size="small"
            onClick={() => forward()}
            style={{ marginLeft: 8 }}
          >
            {currentStep === steps.length - 1 ? "我知道了" : "下一步"}
          </Button>
        </div>
      </div>
    );

    return isMaskMoving ? (
      wrapper
    ) : (
      <Popover
        content={
          <div>
            <Flex justify="flex-end" align="center" style={{ height: 16 }}>
              <CloseOutlined
                className={classNames("text-[12px] text-[#ccc] pr-1 pb-2")}
                onClick={terminate}
              />
            </Flex>
            {content}
            {operation}
          </div>
        }
        open={true}
        placement={getCurrentStep()?.placement}
      >
        {wrapper}
      </Popover>
    );
  };

  const updateFn = useUpdate();

  useMount(updateFn);

  useImperativeHandle(
    ref,
    () => {
      return {
        reStart: () => {
          console.log("useImperativeHandle: linkButton Clicked");
        },
      };
    },
    []
  );

  if (!currentSelectedElement || done) {
    return null;
  }

  const mask = (
    <Mask
      container={currentContainerElement}
      element={currentSelectedElement}
      renderMaskContent={(wrapper) => renderPopover(wrapper)}
      onAnimationStart={() => setIsMaskMoving(true)}
      onAnimationEnd={() => setIsMaskMoving(false)}
    />
  );

  return createPortal(mask, currentContainerElement);
};

export default React.forwardRef(OnBoarding);
