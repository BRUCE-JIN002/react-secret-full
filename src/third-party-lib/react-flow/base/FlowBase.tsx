import {
  addEdge,
  Background,
  BackgroundVariant,
  BaseEdge,
  Connection,
  Controls,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  Handle,
  MiniMap,
  Panel,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Node
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { Button } from "antd";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "red",
    data: { label: <div>Node 1</div> },
    position: { x: 0, y: 0 }
  },
  {
    id: "2",
    type: "lightgreen",
    data: { label: <div>Node 2</div> },
    position: { x: 200, y: 300 }
  }
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2", type: "custom" }];

interface NodeProps {
  data: {
    label: React.ReactNode;
  };
}

function RedNode({ data }: NodeProps) {
  return (
    <div
      style={{
        background: "red",
        width: "100px",
        height: "100px",
        textAlign: "center",
        color: "#fff",
        borderRadius: "5px"
      }}
    >
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Bottom} />
      <div>{data.label}</div>
    </div>
  );
}

function GreenNode({ data }: NodeProps) {
  return (
    <div
      style={{
        background: "lightgreen",
        width: "100px",
        height: "100px",
        textAlign: "center",
        color: "#fff",
        borderRadius: "5px"
      }}
    >
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Left} />
      <Handle type="target" position={Position.Left} />
      <div>{data.label}</div>
    </div>
  );
}

function CustonEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd
}: EdgeProps) {
  const { setEdges } = useReactFlow();

  const [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  const onEdgeClick = () => {
    setEdges((eds) => eds.filter((e) => e.id !== id));
  };

  return (
    <>
      <BaseEdge path={path} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // EdgeLabelRenderer 里的组件默认不处理鼠标事件，如果要处理就要声明 pointerEvents: all
            pointerEvents: "all"
          }}
        >
          <button onClick={onEdgeClick}>×</button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default function FlowBase() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params: Connection) =>
    setEdges((eds) => addEdge(params, eds));

  return (
    <div
      style={{
        width: "800px",
        height: "500px",
        border: "1px solid #ccc",
        margin: "50px auto"
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={{ red: RedNode, lightgreen: GreenNode }}
        edgeTypes={{ custom: CustonEdge }}
        fitView
      >
        <Controls />
        <MiniMap zoomable zoomStep={0.5} />
        <Background variant={BackgroundVariant.Lines} />
        <Panel position="top-right">
          <Button
            type="primary"
            size="small"
            onClick={() => {
              setNodes([
                ...nodes,
                {
                  id: Math.random().toString().slice(2, 6) + "",
                  type: "red",
                  position: { x: 10, y: 10 },
                  data: {
                    label: <div>"new"</div>
                  }
                }
              ]);
            }}
          >
            添加节点
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  );
}
