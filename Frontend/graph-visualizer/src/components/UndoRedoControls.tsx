import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { undo, redo } from "../reducers/graphReducer";
import { Button } from "@mui/material";

const UndoRedoControls: React.FC = () => {
  const dispatch = useDispatch();
  const canUndo = useSelector((state: RootState) => state.graph.past.length > 0);
  const canRedo = useSelector((state: RootState) => state.graph.future.length > 0);

  return (
    <div style={{ marginTop: "10px", textAlign: "center" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(undo())}
        disabled={!canUndo}
        style={{ marginRight: "5px" }}
      >
        Undo
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => dispatch(redo())}
        disabled={!canRedo}
      >
        Redo
      </Button>
    </div>
  );
};

export default UndoRedoControls;
