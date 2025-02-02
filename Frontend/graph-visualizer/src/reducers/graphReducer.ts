import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NodeData {
  id: string;
  position: { x: number; y: number };
  data: { label: string };
  style: { backgroundColor: string; fontSize: number };
}

interface GraphState {
  past: NodeData[][];
  present: NodeData[];
  future: NodeData[][];
}

const initialNodes: NodeData[] = Array.from({ length: 10 }, (_, i) => ({
  id: `${i + 1}`,
  position: { x: Math.random() * 400, y: Math.random() * 400 },
  data: { label: `Node ${i + 1}` },
  style: { backgroundColor: "#ffffff", fontSize: 16 },
}));

const initialState: GraphState = {
  past: [],
  present: initialNodes,
  future: [],
};

const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<NodeData[]>) => {
      state.present = action.payload;
    },
    updateNodeColor: (state, action: PayloadAction<{ id: string; color: string }>) => {
      state.past.push([...state.present]); // Save history
      state.future = []; // Clear redo history

      const node = state.present.find((n) => n.id === action.payload.id);
      if (node) {
        node.style.backgroundColor = action.payload.color;
      }
    },
    updateNodeFontSize: (state, action: PayloadAction<{ id: string; fontSize: number }>) => {
      state.past.push([...state.present]);
      state.future = [];

      const node = state.present.find((n) => n.id === action.payload.id);
      if (node) {
        node.style.fontSize = action.payload.fontSize;
      }
    },
    undo: (state) => {
      if (state.past.length > 0) {
        const previousState = state.past.pop();
        if (previousState) {
          state.future.unshift([...state.present]); // Save redo state
          state.present = previousState;
        }
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const nextState = state.future.shift();
        if (nextState) {
          state.past.push([...state.present]); // Save to past
          state.present = nextState;
        }
      }
    },
  },
});

export const { setNodes, updateNodeColor, updateNodeFontSize, undo, redo } = graphSlice.actions;
export default graphSlice.reducer;
