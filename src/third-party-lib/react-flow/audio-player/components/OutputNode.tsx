import { Handle, Position } from "@xyflow/react";
import { useState } from "react";
import { isRunning, toggleAudio } from "../audio";

export default function OutputNode() {
  const [stateIsRunning, setIsRuning] = useState<boolean>(() => isRunning());

  return (
    <div className={"bg-white shadow-xl p-[20px] rounded-md"}>
      <Handle
        className="w-[10px] h-[10px]"
        type="target"
        position={Position.Top}
      />

      <div className={"flex flex-col justify-center items-center"}>
        <p>输出节点</p>
        <button
          onClick={() => {
            setIsRuning((state) => !state);
            toggleAudio();
          }}
        >
          {stateIsRunning ? (
            <span role="img">🔈</span>
          ) : (
            <span role="img">🔇</span>
          )}
        </button>
      </div>
    </div>
  );
}
