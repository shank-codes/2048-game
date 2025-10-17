const target = 2048;

export function createEmptyGrid(n: number): number[][] {
  return Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
}

export function addRandomTile(grid: number[][]): boolean {
  const empties: [number, number][] = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid.length; c++) {
      if (!grid[r][c]) empties.push([r, c]);
    }
  }
  if (!empties.length) return false;
  const [r, c] = empties[Math.floor(Math.random() * empties.length)];
  grid[r][c] = Math.random() < 0.9 ? 2 : 4;
  return true;
}

function cloneGrid(grid: number[][]): number[][] {
  return grid.map((row) => row.slice());
}

export function has2048(grid: number[][]): boolean {
  return grid.some((row) => row.some((v) => v === target));
}

export function canMove(grid: number[][]): boolean {
  const n = grid.length;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 0) return true;
      if (r + 1 < n && grid[r][c] === grid[r + 1][c]) return true;
      if (c + 1 < n && grid[r][c] === grid[r][c + 1]) return true;
    }
  }
  return false;
}

export function moveGrid(
  grid: number[][],
  dir: "up" | "down" | "left" | "right"
): { movedGrid: number[][]; moved: boolean; gained: number } {
  const n = grid.length;
  let moved = false;
  let gained = 0;
  const g = cloneGrid(grid);

  const traverse = (get: () => number[]) => {
    const arr = get();
    const compacted = compactAndMerge(arr);
    if (compacted.moved) moved = true;
    gained += compacted.gained;
    return compacted.arr;
  };

  if (dir === "left") {
    for (let r = 0; r < n; r++) {
      const out = traverse(() => g[r].slice());
      for (let c = 0; c < n; c++) g[r][c] = out[c] || 0;
    }
  } else if (dir === "right") {
    for (let r = 0; r < n; r++) {
      const out = traverse(() => g[r].slice().reverse()).reverse();
      for (let c = 0; c < n; c++) g[r][c] = out[c] || 0;
    }
  } else if (dir === "up") {
    for (let c = 0; c < n; c++) {
      const out = traverse(() => g.map((r) => r[c]));
      for (let r = 0; r < n; r++) g[r][c] = out[r] || 0;
    }
  } else if (dir === "down") {
    for (let c = 0; c < n; c++) {
      const out = traverse(() => g.map((r) => r[c]).reverse()).reverse();
      for (let r = 0; r < n; r++) g[r][c] = out[r] || 0;
    }
  }

  return { movedGrid: g, moved, gained };
}

function compactAndMerge(arr: number[]) {
  const filtered = arr.filter((v) => v);
  const out: number[] = [];
  let moved = false;
  let gained = 0;

  for (let i = 0; i < filtered.length; i++) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      const merged = filtered[i] * 2;
      out.push(merged);
      gained += merged;
      i++;
      moved = true;
    } else {
      out.push(filtered[i]);
    }
  }

  if (out.length !== arr.length) moved = true;
  else
    for (let i = 0; i < arr.length; i++)
      if (arr[i] !== (out[i] || 0)) moved = true;

  while (out.length < arr.length) out.push(0);
  return { arr: out, moved, gained };
}
