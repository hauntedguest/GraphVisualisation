import React from "react";
import { SketchPicker } from "react-color";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  return (
    <SketchPicker
      color={color}
      onChangeComplete={(color) => onChange(color.hex)}
    />
  );
};

export default ColorPicker;
