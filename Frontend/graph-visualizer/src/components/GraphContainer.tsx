import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  Edge,
  Node,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes: Node[] = Array.from({ length: 10 }, (_, i) => ({
  id: `${i + 1}`,
  position: { x: Math.random() * 400, y: Math.random() * 400 },
  data: { label: `Node ${i + 1}` },
}));

const initialEdges: Edge[] = initialNodes.map((node, i) => ({
  id: `e${i}-${i + 1}`,
  source: `${i + 1}`,
  target: `${(i + 2) % initialNodes.length || 1}`,
}));

const GraphContainer: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, [setEdges]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default GraphContainer;
