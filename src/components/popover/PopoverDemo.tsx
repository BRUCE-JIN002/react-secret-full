import React from "react";
import { Button } from "antd";
import Popover, { AlignedPlacement } from "./Popover";
import { useSafeState } from "ahooks";
import _ from "lodash";

const directions: AlignedPlacement[] = [
  "top",
  "right",
  "bottom",
  "left",
  "top-start",
  "top-end",
  "right-start",
  "right-end",
  "bottom-start",
  "bottom-end",
  "left-start",
  "left-end",
];

const randomPosition = () => directions[_.random(0, 11)];

const PopoverDemo = () => {
  const [position, setPosition] = useSafeState<AlignedPlacement>("top");
  return (
    <Popover
      onOpenChange={(open) => {
        !open && setPosition(() => randomPosition());
      }}
      content={
        <div className="w-48">
          <h5 className="mb-5">Hello World ! 🤔</h5>
          <div className="popover-content">this is content!!</div>
          <div className="popover-content">this is content!!</div>
        </div>
      }
      placement={position}
    >
      <Button type="primary" size="large">
        Hover me
      </Button>
    </Popover>
  );
};

export default PopoverDemo;
