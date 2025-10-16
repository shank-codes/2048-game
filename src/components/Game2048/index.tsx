"use client";
import React, { useEffect, useState, useCallback } from "react";
import Board from "./Board";
import {
  createEmptyGrid,
  addRandomTile,
  moveGrid,
  has2048,
  canMove,
} from "./logic";
import useSwipe from "./useSwipe";

interface Game2048Props {
  initialSize?: number;
}

const Game2048: React.FC<Game2048Props> = ({ initialSize = 4 }) => {
  const [size, setSize] = useState(initialSize);
  const [grid, setGrid] = useState<number[][]>(createEmptyGrid(initialSize));
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  // initialize
  useEffect(() => {
    resetBoard(size);
  }, []);

  // reset board on size change
  useEffect(() => {
    resetBoard(size);
  }, [size]);

  const resetBoard = (n: number) => {
    setWon(false);
    setLost(false);
    setScore(0);
    const g = createEmptyGrid(n);
    addRandomTile(g);
    addRandomTile(g);
    setGrid(g);
  };

  const doMove = useCallback(
    (dir: "up" | "down" | "left" | "right") => {
      if (won || lost) return;
      const { movedGrid, moved, gained } = moveGrid(grid, dir);
      if (!moved) return;

      if (gained) setScore((s) => s + gained);
      addRandomTile(movedGrid);
      setGrid(movedGrid);

      if (has2048(movedGrid)) setWon(true);
      else if (!canMove(movedGrid)) setLost(true);
    },
    [grid, won, lost]
  );

  type Direction = "up" | "down" | "left" | "right";

  const handleMove = (direction: Direction) => {
    doMove(direction); // existing game move logic
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        const dir = e.key.replace("Arrow", "").toLowerCase() as Direction;
        handleMove(dir);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [grid]);

  useSwipe(doMove);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">2048 — Custom Board</h1>
        <div className="text-right">
          <div className="text-sm">Score</div>
          <div className="text-xl font-semibold">{score}</div>
        </div>
      </div>

      <div className="flex gap-4 items-center mb-4">
        <label className="flex items-center gap-2">
          Board size:
          <select
            value={size}
            onChange={(e) => {
              setSize(parseInt(e.target.value, 10));
              e.target.blur();
            }}
            className="ml-2 border rounded px-2 py-1"
          >
            {[3, 4, 5, 6, 7, 8, 9].map((n) => (
              <option key={n} value={n}>
                {n} × {n}
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={() => resetBoard(size)}
          className="ml-2 px-3 py-1 rounded bg-blue-600 text-gray-400"
        >
          New Game
        </button>
      </div>

      <div
        className="bg-gray-800 p-3 rounded-lg inline-block"
        style={{ touchAction: "none" }}
      >
        <Board grid={grid} />
        <div className="mt-6 flex flex-col items-center space-y-2">
          <button
            onClick={() => handleMove("up")}
            className="bg-gray-200 hover:bg-gray-300 p-3 rounded-xl text-xl font-bold shadow"
          >
            ↑
          </button>
          <div className="flex space-x-4">
            <button
              onClick={() => handleMove("left")}
              className="bg-gray-200 hover:bg-gray-300 p-3 rounded-xl text-xl font-bold shadow"
            >
              ←
            </button>
            <button
              onClick={() => handleMove("down")}
              className="bg-gray-200 hover:bg-gray-300 p-3 rounded-xl text-xl font-bold shadow"
            >
              ↓
            </button>
            <button
              onClick={() => handleMove("right")}
              className="bg-gray-200 hover:bg-gray-300 p-3 rounded-xl text-xl font-bold shadow"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {won && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          You reached 2048! 🎉
        </div>
      )}
      {lost && (
        <div className="mt-4 p-4 bg-red-100 rounded">
          No moves left — game over.
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        Controls: arrow keys or swipe
      </div>
    </div>
  );
};

export default Game2048;
