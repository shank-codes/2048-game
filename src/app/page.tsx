import Game2048 from "@/components/Game2048";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-400 flex items-center justify-center">
      <Game2048 initialSize={4} />
    </main>
  );
}
