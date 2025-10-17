"use client";
import React, { useState, useEffect } from "react";

interface BoardProps {
  grid: number[][];
}

const tileColor = (val: number): string => {
  if (!val) return "#cdc1b4";
  const colors: Record<number, string> = {
    2: "#fefefd", // white tile
    4: "#eee2c7", // beige tile
    8: "#faae72", // orange tile
    16: "#f9b24e", // deeper orange-yellow
    32: "#ff944d", // coral orange
    64: "#ff7043", // bright red-orange
    128: "#f4d03f", // yellow-gold
    256: "#81c784", // soft green
    512: "#4db6ac", // teal
    1024: "#64b5f6", // blue
    2048: "#9575cd", // purple (high-value tile)
  };
  return colors[val] || "#a19e98";
};

const Board: React.FC<BoardProps> = ({ grid }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }

  const size = grid.length;

  return (
    <div
      id="game-board"
      className={`grid bg-[#555555] p-2 rounded-lg mx-auto gap-[4px] w-full max-w-[500px] will-change-transform`}
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
      }}
    >
      {grid.flat().map((val, idx) => (
        <div
          key={idx}
          className="flex items-center justify-center font-bold rounded transition-all"
          style={{
            aspectRatio: "1 / 1",
            background: tileColor(val),
            color: val > 4 ? "#fefefd" : "#776e65",
            boxShadow: val ? "inset 0 -4px rgba(0,0,0,0.2)" : "none",
            // fontSize: `clamp(0.9rem, 2.5vw, 1.5rem)`, // slightly bigger min and use vw carefully
            fontSize: `clamp(0.8rem, ${12 / size}vw, 1.5rem)`,
          }}
        >
          {val || ""}
        </div>
      ))}
    </div>
  );
};

export default Board;
