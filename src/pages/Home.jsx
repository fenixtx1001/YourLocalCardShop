import { button } from "../components/ui/freshbutton";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-950 text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-center">Your Local Card Shop</h1>
      <p className="text-lg mb-8 text-center text-slate-300">
        Rip packs, build your collection, and chase your favorite players.
      </p>
      <Button onClick={() => (window.location.href = "/store")}>Enter the Shop</Button>
    </div>
  );
}

