import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  Edge,
  NodeChange,
  applyNodeChanges,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import NodeCustomizationPanel from "./NodeCustomizationPanel";
import UndoRedoControls from "./UndoRedoControls";
import { RootState } from "../store";
import { setNodes } from "../reducers/graphReducer";

const initialEdges: Edge[] = Array.from({ length: 10 }, (_, i) => ({
  id: `e${i}-${i + 1}`,
  source: `${i + 1}`,
  target: `${(i + 2) % 10 || 1}`,
}));

const GraphContainer: React.FC = () => {
  const dispatch = useDispatch();
  const nodes = useSelector((state: RootState) => state.graph.present, (prev, next) => prev === next);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    dispatch(setNodes(nodes));
  }, [dispatch]);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, [setEdges]);

  // ✅ Allow nodes to be dragged and update Redux state
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      dispatch(setNodes(applyNodeChanges(changes, nodes) as any));
    },
    [dispatch, nodes]
  );

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}  // ✅ Allow nodes to move
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <div>
        <NodeCustomizationPanel />
        <UndoRedoControls />
      </div>
    </div>
  );
};

export default GraphContainer;
