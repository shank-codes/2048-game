# 2048 Game (Next.js + TypeScript)

A minimalist implementation of the classic 2048 puzzle game built with **Next.js (App Router)** and **TypeScript**, featuring dynamic board sizes, keyboard and GUI controls, and a clean Tailwind-powered UI.

🌐 **Live Demo:** https://2048-game-opal-nine.vercel.app/  

---

## 🚀 Features
- Built using **Next.js App Router** inside `src/app`.
- Dynamic board size selection.
- Supports both **keyboard arrow keys** and **on-screen GUI arrow buttons**.
- Responsive, mobile-friendly layout.
- Score tracking.
- Clean, modular codebase written in TypeScript.
- No undo or swap options (for authentic 2048 challenge).

---

## 🛠️ Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (>= 18.x)
- **npm** or **yarn**

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/shank-codes/2048-game.git
   cd nextjs-2048
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

## 🎮 Gameplay Instructions

1. **Objective:** Merge tiles with the same number to reach **2048**.
2. **Controls:**
   - Use **arrow keys** on desktop.
   - Use **on-screen arrow buttons** on mobile or touch devices.
3. **Board Size:**
   - Select a grid size using the dropdown before starting.
4. **Game Over:** The game ends when no valid moves remain.

---

## ⚙️ Implementation Details

### 1. Project Structure
```
src/
 ├── app/
 │   ├── page.tsx         # Main entry page
 │   ├── globals.css      # Tailwind styles
 │   └── components/
 │       ├── index.tsx  # Main game component
 │       ├── Board.tsx       # NxN board component
 │       └── Controls.tsx   # On-screen arrow buttons
```

### 2. Core Logic
- The game state is maintained as a **2D grid array** of numbers.
- Movement functions handle merging, shifting, and spawning new tiles.
- A random tile (2 or 4) is generated after every valid move.
- Score is tracked using React state.

### 3. Input Handling
- Keyboard inputs (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`) trigger movement.
- GUI controls call the same handler via `handleMove(direction)`.

### 4. Dynamic Board Size
- The board is reinitialized when the user selects a new size.
- Dropdown automatically blurs after selection to allow immediate keyboard play.

### 5. Styling
- Built with **Tailwind CSS** for consistent and modern UI.
- Tiles have color mapping based on their numeric value.

---

## 🧩 Future Enhancements
- Smooth animations for tile movement and merging.
- Persistent high-score storage using localStorage.
- Sound effects and haptic feedback.
- Light/Dark theme toggle.

---

## 📄 License
This project is open source under the **MIT License**.
