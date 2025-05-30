import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import Button from "../components/ui/freshbutton";

export default function Store() {
  const [sets, setSets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const url = `https://opensheet.elk.sh/1UxEzbEATHp46tLxFp2UFhuMwTq2_Kk8QEg-L5uiJSA8/Base`;
        const response = await fetch(url);
        const data = await response.json();
        setSets(data);
      } catch (err) {
        console.error("Metadata load failed", err);
        setError("Metadata load failed");
      }
    }
    fetchMetadata();
  }, []);

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-950 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Your Local Card Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sets.map((pack, index) => (
          <Card key={index} className="bg-slate-900 border border-slate-700 text-white">
            <CardContent className="p-4 flex flex-col items-center">
              <img
                src={pack.PackImage}
                alt={`${pack.SetName} Pack`}
                className="w-40 h-40 object-contain mb-4"
              />
              <div className="text-xl font-bold mb-1 text-center">{pack.SetName}</div>
              <div className="text-sm text-slate-400 mb-1 text-center">Sport: {pack.Sport}</div>
              <div className="text-sm text-slate-400 mb-1 text-center">Cards: {pack.PackSize}</div>
              <div className="text-sm text-green-400 font-semibold mb-3 text-center">
                Price: {pack.PackCost}
              </div>
              <Button
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

