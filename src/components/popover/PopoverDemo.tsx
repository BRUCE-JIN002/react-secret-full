import React from "react";
import { Button } from "antd";
import Popover from "./Popover";

const PopoverDemo = () => {
  return (
    <Popover
      content={
        <div>
          <h5>Title</h5>
          <div className="popover-content">content</div>
          <div className="popover-content">content</div>
        </div>
      }
      placement="top"
    >
      <Button type="primary" size="large">
        Hover me
      </Button>
    </Popover>
  );
};

export default PopoverDemo;
