import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store.js";
import { updateNodeColor, updateNodeFontSize } from "../reducers/graphReducer.js";
import { SketchPicker } from "react-color";
import { Slider, Select, MenuItem } from "@mui/material";

const NodeCustomizationPanel: React.FC = () => {
  const nodes = useSelector((state: RootState) => state.graph.present);
  const dispatch = useDispatch();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [color, setColor] = useState<string>("#ffffff");
  const [fontSize, setFontSize] = useState<number>(16);

  useEffect(() => {
    if (selectedNodeId) {
      const selectedNode = nodes.find((node) => node.id === selectedNodeId);
      if (selectedNode) {
        setColor(selectedNode.style.backgroundColor);
        setFontSize(selectedNode.style.fontSize);
      }
    }
  }, [selectedNodeId, nodes]);

  const handleColorChange = (newColor: any) => {
    if (selectedNodeId) {
      setColor(newColor.hex);
      dispatch(updateNodeColor({ id: selectedNodeId, color: newColor.hex }));
    }
  };

  const handleFontSizeChange = (_event: any, newSize: number) => {
    setFontSize(newSize);
    if (selectedNodeId) {
      dispatch(updateNodeFontSize({ id: selectedNodeId, fontSize: newSize }));
    }
  };

  return (
    <div style={{ padding: "10px", border: "1px solid #ccc", width: "250px" }}>
      <h3>Customize Node</h3>
      
      {/* Node Selection Dropdown */}
      <Select
        value={selectedNodeId || ""}
        onChange={(e) => setSelectedNodeId(e.target.value)}
        displayEmpty
        fullWidth
      >
        <MenuItem value="" disabled>Select a Node</MenuItem>
        {nodes.map((node) => (
          <MenuItem key={node.id} value={node.id}>{node.data.label}</MenuItem>
        ))}
      </Select>

      {/* Color Picker */}
      <div style={{ marginTop: "10px" }}>
        <h4>Pick Color:</h4>
        <SketchPicker color={color} onChange={handleColorChange} />
      </div>

      {/* Font Size Control */}
      <div style={{ marginTop: "10px" }}>
        <h4>Font Size:</h4>
        <Slider
          value={fontSize}
          onChange={handleFontSizeChange}
          min={12}
          max={24}
          step={1}
          valueLabelDisplay="auto"
        />
      </div>
    </div>
  );
};

export default React.memo(NodeCustomizationPanel);
