import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NodeData {
  id: string;
  label: string;
  color: string;
  fontSize: number;
}

interface GraphState {
  nodes: NodeData[];
}

const initialState: GraphState = {
  nodes: [],
};

const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<NodeData[]>) => {
      state.nodes = action.payload;
    },
  },
});

export const { setNodes } = graphSlice.actions;
export default graphSlice.reducer;
