import { Link } from 'react-router-dom';
import { Button } from '../components/ui/freshbutton';
import Inventory from '../components/Inventory';
import Bank from '../components/Bank';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-950 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <h1 className="text-4xl font-extrabold mb-4 text-center drop-shadow-lg">Your Local Card Shop</h1>
        <p className="text-lg mb-8 text-center text-slate-300">
          Rip packs, build your collection, and chase your favorite players.
        </p>

        {/* Bank Card */}
        <div className="bg-slate-900 rounded-2xl shadow-lg p-5 mb-6 border border-slate-700">
          <h2 className="text-2xl font-bold mb-1">Bank</h2>
          <div className="text-green-400 text-xl font-mono">
            <Bank />
          </div>
        </div>

        {/* Inventory Card */}
        <div className="bg-slate-900 rounded-2xl shadow-lg p-5 mb-8 border border-slate-700">
          <h2 className="text-2xl font-bold mb-2">Your Inventory</h2>
          <div className="text-base text-slate-200">
            <Inventory />
          </div>
        </div>

        {/* Enter Shop Button */}
        <div className="flex justify-center">
          <Link to="/store">
            <Button>
              <span className="px-6 py-2 text-lg font-bold">Enter the Shop</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
