import React from "react";

interface FontSizeControlProps {
  fontSize: number;
  onChange: (size: number) => void;
}

const FontSizeControl: React.FC<FontSizeControlProps> = ({ fontSize, onChange }) => {
  console.log("FontSizeControl Rendered with fontSize:", fontSize); // Debugging log

  return (
    <div style={{ marginTop: "10px" }}>
      <label>Font Size: </label>
      <input
        type="range"
        min={12}
        max={24}
        value={fontSize}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span> {fontSize}px</span>
    </div>
  );
};

export default FontSizeControl;
