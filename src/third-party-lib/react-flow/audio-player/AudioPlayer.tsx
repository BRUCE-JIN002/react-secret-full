import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  MiniMap,
  OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Node,
  type Edge,
  Panel
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import OscillatorNode from "./components/OscillatorNode";
import VolumeNode from "./components/VolumeNode";
import OutputNode from "./components/OutputNode";
import { connect, createAudioNode, disconnect, removeAudioNode } from "./audio";
import { Button } from "antd";
import { useEffect } from "react";

const initialNodes: Node[] = [
  {
    id: "a",
    position: { x: 0, y: 0 },
    data: { frequency: 423, type: "sine" },
    type: "osc"
  },
  {
    id: "b",
    position: { x: 100, y: 300 },
    data: { gain: 0.5 },
    type: "volume"
  },
  {
    id: "c",
    position: { x: 50, y: 500 },
    data: {},
    type: "out"
  }
];

const nodeTypes = {
  osc: OscillatorNode,
  volume: VolumeNode,
  out: OutputNode
};

const initialEdges: Edge[] = [
  { id: "e1-2", source: "a", target: "b" },
  { id: "e2-3", source: "b", target: "c" }
];

export default function AudioPlayer() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = (params: Connection) => {
    connect(params.source, params.target);
    setEdges((eds) => addEdge(params, eds));
  };

  useEffect(() => {
    initialEdges.forEach((edge) => {
      connect(edge.source, edge.target);
    });
  }, []);

  const addOscNode = () => {
    const node: Node = {
      id: `${nodes.length + 1}`,
      position: { x: 10, y: 15 },
      data: { frequency: 423, type: "square" },
      type: "osc"
    };
    setNodes([...nodes, node]);
    createAudioNode(node.id, node.type!, node.data);
  };

  const addVolumeNode = () => {
    const node: Node = {
      id: `${nodes.length + 1}`,
      position: { x: 15, y: 10 },
      data: { gain: 300 },
      type: "volume"
    };
    setNodes([...nodes, node]);
    createAudioNode(node.id, node.type!, node.data);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={(nodes) => {
          nodes.forEach((node) => {
            removeAudioNode(node.id);
          });
        }}
        onEdgesDelete={(edges) => {
          for (const { source, target } of edges) {
            disconnect(source, target);
          }
        }}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Lines} />
        <Panel className={"space-x-4"} position="top-right">
          <Button size="small" type="primary" onClick={addOscNode}>
            添加震荡器节点
          </Button>
          <Button size="small" type="primary" onClick={addVolumeNode}>
            添加音量节点
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  );
}
