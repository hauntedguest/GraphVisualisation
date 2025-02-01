import React, { useEffect } from "react";
import NodeCustomizationPanel from "./NodeCustomizationPanel";

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
import { useDispatch } from "react-redux";
import { selectNode } from "../reducers/graphReducer";

const initialNodes: Node[] = Array.from({ length: 10 }, (_, i) => ({
  id: `${i + 1}`,
  position: { x: Math.random() * 400, y: Math.random() * 400 },
  data: { label: `Node ${i + 1}` },
  style: { backgroundColor: "#ffffff", fontSize: 14 },
}));

const initialEdges: Edge[] = initialNodes.map((node, i) => ({
  id: `e${i}-${i + 1}`,
  source: `${i + 1}`,
  target: `${(i + 2) % initialNodes.length || 1}`,
}));

const GraphContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);  // Ensure nodes are set on mount
  }, []);

  const onConnect = (connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  };

  const onNodeClick = (_event: any, node: Node) => {
    dispatch(selectNode(node.id)); // Ensure this dispatch works
  };  
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick} // Ensure this function exists
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <NodeCustomizationPanel /> {/* Ensure this is inside the flex container */}
    </div>

  );
};

export default GraphContainer;
