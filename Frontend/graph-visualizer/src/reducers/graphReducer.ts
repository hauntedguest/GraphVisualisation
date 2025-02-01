import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NodeData {
  id: string;
  label: string;
  color: string;
  fontSize: number;
}

interface GraphState {
  nodes: NodeData[];
  selectedNode: NodeData | null;
}

const initialState: GraphState = {
  nodes: Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    label: `Node ${i + 1}`,
    color: "#ffffff",  // Default white color
    fontSize: 14,      // Default font size
  })),
  selectedNode: null,
};


const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<NodeData[]>) => {
      state.nodes = action.payload;
    },
    selectNode: (state, action: PayloadAction<string>) => {
      state.selectedNode = state.nodes.find((node) => node.id === action.payload) || null;
    },
    updateNodeStyle: (
      state,
      action: PayloadAction<{ id: string; color?: string; fontSize?: number }>
    ) => {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        if (action.payload.color) node.color = action.payload.color;
        if (action.payload.fontSize) node.fontSize = action.payload.fontSize;
        state.selectedNode = { ...node };
      }
    },
  },
});

export const { setNodes, selectNode, updateNodeStyle } = graphSlice.actions;
export default graphSlice.reducer;
