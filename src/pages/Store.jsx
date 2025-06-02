import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/freshbutton";

// A default image for missing/broken pack images
const defaultPackImage = "/default-pack.png"; // Put this image in your public folder

export default function Store() {
  const [sets, setSets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const url = `https://opensheet.elk.sh/1UxEzbEATHp46tLxFp2UFhuMwTq2_Kk8QEg-L5uiJSA8/Base`;
        const response = await fetch(url);
        const data = await response.json();
        setSets(data);
        setLoading(false);
      } catch (err) {
        console.error("Metadata load failed", err);
        setError("Metadata load failed");
        setLoading(false);
      }
    }
    fetchMetadata();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-800 to-slate-950">
        <div className="text-white text-2xl animate-pulse">Loading packs...</div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-950 text-white p-6">
      <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight drop-shadow-lg">
        Your Local Card Shop
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sets.map((pack, index) => (
          <Card
            key={index}
            className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <CardContent className="p-6 flex flex-col items-center">
              <div className="w-40 h-40 flex items-center justify-center bg-slate-800 rounded-xl mb-4 overflow-hidden">
                <img
                  src={pack.PackImage || defaultPackImage}
                  alt={`${pack.SetName} Pack`}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultPackImage;
                  }}
                />
              </div>
              <div className="text-2xl font-bold mb-2 text-center">{pack.SetName}</div>
              <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 mb-2">
                <span className="bg-slate-700 rounded px-2 py-1 text-xs font-medium">
                  {pack.Sport}
                </span>
                <span className="bg-slate-700 rounded px-2 py-1 text-xs font-medium">
                  {pack.PackSize} Cards
                </span>
              </div>
              <div className="text-lg text-green-400 font-semibold mb-3 text-center">
                ${pack.PackCost}
              </div>
              <Button
                className="w-full py-2 text-lg rounded-lg font-bold bg-blue-500 hover:bg-blue-600 transition-colors shadow"
                onClick={() => {
                  localStorage.setItem("selectedPack", JSON.stringify(pack));
                  window.location.href = "/packopener";
                }}
              >
                Buy Pack
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
