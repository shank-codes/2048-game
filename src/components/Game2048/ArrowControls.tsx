import { Direction } from "@/types/controls.type";

const ArrowControls = ({
  handleMove,
}: {
  handleMove: (dir: Direction) => void;
}) => {
  return (
    <section className="mt-6 flex flex-col items-center space-y-2 text-black">
      <button
        onClick={() => handleMove("up")}
        className="bg-gray-200 hover:bg-gray-300 p-3 rounded-xl text-xl font-bold shadow cursor-pointer"
      >
        ↑
      </button>
      <div className="flex space-x-4">
        <button
          onClick={() => handleMove("left")}
          className="bg-gray-200 hover:bg-gray-300 p-3 rounded-xl text-xl font-bold shadow cursor-pointer"
        >
          ←
        </button>
        <button
          onClick={() => handleMove("down")}
          className="bg-gray-200 hover:bg-gray-300 p-3 rounded-xl text-xl font-bold shadow cursor-pointer"
        >
          ↓
        </button>
        <button
          onClick={() => handleMove("right")}
          className="bg-gray-200 hover:bg-gray-300 p-3 rounded-xl text-xl font-bold shadow cursor-pointer"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default ArrowControls;
