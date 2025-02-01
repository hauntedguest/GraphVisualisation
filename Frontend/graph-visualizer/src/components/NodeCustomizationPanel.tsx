import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { updateNodeStyle } from "../reducers/graphReducer";
import ColorPicker from "./ColorPicker";
import FontSizeControl from "./FontSizeControl";

const NodeCustomizationPanel: React.FC = () => {
  const selectedNode = useSelector((state: RootState) => state.graph.selectedNode);
  const dispatch = useDispatch();

  console.log("Selected Node in Panel:", selectedNode); // Debugging

  if (!selectedNode) {
    console.log("No node selected"); // Debugging
    return <p>Select a node to customize</p>;
  }

  return (
    <div style={{ padding: "10px", border: "1px solid black", width: "250px" }}>
      <h3>Customize Node</h3>
      <ColorPicker
        color={selectedNode.color}
        onChange={(color) => dispatch(updateNodeStyle({ id: selectedNode.id, color }))}
      />
      <FontSizeControl
        fontSize={selectedNode.fontSize}
        onChange={(size) => dispatch(updateNodeStyle({ id: selectedNode.id, fontSize: size }))}
      />
    </div>
  );
};

export default NodeCustomizationPanel;
