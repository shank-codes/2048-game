import React from "react";

interface BoardProps {
  grid: number[][];
}

const tileColor = (val: number): string => {
  if (!val) return "#cdc1b4";
  const colors: Record<number, string> = {
    2: "#eee4da",
    4: "#ede0c8",
    8: "#f2b179",
    16: "#f59563",
    32: "#f67c5f",
    64: "#f65e3b",
    128: "#edcf72",
    256: "#edcc61",
    512: "#edc850",
    1024: "#edc53f",
    2048: "#edc22e",
  };
  return colors[val] || "#3c3a32";
};

const Board: React.FC<BoardProps> = ({ grid }) => {
  const size = grid.length;
  const gap = 4;

  return (
    <div
      className="grid bg-neutral-900 p-3 rounded-lg"
      style={{
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        gap: `${gap}px`,
        width: `${size * 72 + (size - 1) * gap}px`,
      }}
    >
      {grid.flat().map((val, idx) => (
        <div
          key={idx}
          className="flex items-center justify-center text-lg font-bold rounded transition-all"
          style={{
            height: 72,
            background: tileColor(val),
            color: val > 4 ? "#f9f6f2" : "#776e65",
            boxShadow: val ? "inset 0 -4px rgba(0,0,0,0.2)" : "none",
          }}
        >
          {val || ""}
        </div>
      ))}
    </div>
  );
};

export default Board;
