"use client";
import React, { useEffect, useState, useCallback } from "react";
import Board from "./Board";
import ArrowControls from "./ArrowControls";
import {
  createEmptyGrid,
  addRandomTile,
  moveGrid,
  has2048,
  canMove,
} from "@/lib/gameLogic";
// import useSwipe from "@/customHooks/useSwipe";
import { Direction } from "@/types/controls.type";

interface Game2048Props {
  initialSize?: number;
}

const gridSizes = [3, 4, 5, 6, 7, 8, 9];

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

  const handleMove = (direction: Direction) => {
    doMove(direction);
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

  // useSwipe(doMove);

  return (
    <div className="p-4 sm:p-6 max-w-full mx-auto">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">2048 — Custom Board</h1>
        <div className="flex flex-col items-center text-right border-2 rounded-sm p-1">
          <div className="text-xs">Score</div>
          <div className="text-base font-semibold">{score}</div>
        </div>
      </header>

      <section className="flex gap-4 items-center mb-4 justify-between">
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
            {gridSizes.map((n) => (
              <option key={n} value={n}>
                {n} × {n}
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={() => resetBoard(size)}
          className="ml-2 px-3 py-1 rounded bg-blue-500 text-white cursor-pointer"
        >
          New Game
        </button>
      </section>

      <section
        className="bg-gray-800 p-3 rounded-lg flex flex-col items-center"
        // style={{ touchAction: "none" }}
      >
        <Board key={size} grid={grid} />
        <ArrowControls handleMove={handleMove} />
      </section>

      {won && (
        <div className="mt-4 p-4 bg-green-400 text-gray-50 rounded text-center">
          You reached 2048! 🎉
        </div>
      )}
      {lost && (
        <div className="mt-4 p-4 bg-red-400 text-gray-50 rounded text-center">
          No moves left — game over.
        </div>
      )}

      <p className="mt-4 text-sm text-gray-50">
        Controls: keyboard or GUI arrow keys
      </p>
    </div>
  );
};

export default Game2048;
