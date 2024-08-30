import { Handle, Position } from "@xyflow/react";
import { ChangeEventHandler, useState } from "react";
import { updateAudioNode } from "../audio";
import { Select } from "antd";

export interface OscillatorNodeProps {
  id: string;
  data: {
    frequency: number;
    type: string;
  };
}

const OscillatorNode: React.FC<OscillatorNodeProps> = ({ id, data }) => {
  const [frequency, setFrequency] = useState(data.frequency);
  const [type, setType] = useState(data.type);

  const onChangeFrequency: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFrequency(+e.target.value);
    updateAudioNode(id, { frequency: +e.target.value });
  };

  const onChangeType: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setType(e.target.value as OscillatorType);
    updateAudioNode(id, { type: e.target.value });
  };

  return (
    <div className={"bg-white shadow-xl rounded-md"} key={id}>
      <p className={"rounded-t-md p-2 bg-pink-500 text-white"}>振荡器节点</p>
      <div className={"flex flex-col p-[8px]"}>
        <span className={"font-bold text-sm"}>频率</span>
        <input
          className="nodrag"
          type="range"
          min="10"
          max="1000"
          value={frequency}
          onChange={onChangeFrequency}
        />
        <span className={"text-right text-sm"}>{frequency} 赫兹</span>
      </div>
      <hr className={"mx-[4px]"} />
      <div className={"flex flex-col p-[8px]"}>
        <span className={"font-bold text-sm"}>波形</span>
        <select value={type} onChange={onChangeType}>
          <option value="sine">正弦波</option>
          <option value="sawtooth">锯齿波</option>
          <option value="triangle">三角波</option>
          <option value="square">方波</option>
        </select>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default OscillatorNode;
