// Updated pack opener with improved SheetID parsing, card value display, and sequential reveal

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PackOpener() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const pack = JSON.parse(localStorage.getItem("selectedPack"));
    console.log("Selected pack:", pack);

    if (!pack) {
      setError("No pack selected");
      setLoading(false);
      return;
    }

    async function fetchChecklist() {
      try {
        let rawSheetId = pack.SheetID;
        const match = rawSheetId.match(/[-\w]{25,}/);
        const sheetId = match ? match[0] : rawSheetId;

        const url = `https://opensheet.elk.sh/${sheetId}/Base`;
        console.log("Fetching checklist from:", url);

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch checklist");
        const data = await response.json();
        console.log("Fetched checklist:", data);

        if (!Array.isArray(data)) throw new Error("Checklist is not an array");

        const baseCards = data.filter(row => !row.Insert);
        const packSize = parseInt(pack.PackSize) || 15;

        const shuffled = [...baseCards].sort(() => 0.5 - Math.random());
        const pulled = shuffled.slice(0, packSize);
        setCards(pulled);
      } catch (err) {
        console.error("Pack rip failed:", err);
        setError("Failed to load pack contents");
      } finally {
        setLoading(false);
      }
    }

    fetchChecklist();
  }, []);

  if (loading) return <div className="p-6 text-center text-xl">Loading Pack...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  const card = cards[currentIndex] || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-950 text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-center">You Opened a {card.SetName || "Pack"}!</h1>

      <Card className="bg-slate-900 border border-slate-700 text-white w-72">
        <CardContent className="p-4 flex flex-col items-center">
          {card.ImageURL ? (
            <img
              src={card.ImageURL.trim()}
              alt={card.Player || "Card"}
              onError={(e) => (e.target.style.display = "none")}
              className="w-full h-64 object-contain mb-4"
            />
          ) : (
            <div className="w-full h-64 bg-slate-700 text-center flex items-center justify-center mb-4">
              No image
            </div>
          )}
          <div className="text-lg font-semibold text-center">{card.Player}</div>
          <div className="text-sm text-slate-400">#{card.CardNumber}</div>
          <div className="text-sm text-green-400 mt-2">Value: {card.Value || "$0.00"}</div>
        </CardContent>
      </Card>

      <div className="mt-6 flex gap-4">
        {currentIndex < cards.length - 1 ? (
          <Button onClick={() => setCurrentIndex(currentIndex + 1)}>Next Card</Button>
        ) : (
          <Button onClick={() => window.location.href = "/"}>Back to Store</Button>
        )}
      </div>

      {currentIndex === cards.length - 1 && (
        <div className="mt-10 text-center">
          <h2 className="text-xl font-bold mb-4">Pack Summary</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {cards.map((c, idx) => (
              <Card key={idx} className="bg-slate-900 border border-slate-700 text-white">
                <CardContent className="p-2 flex flex-col items-center">
                  {c.ImageURL ? (
                    <img
                      src={c.ImageURL.trim()}
                      alt={c.Player || "Card"}
                      onError={(e) => (e.target.style.display = "none")}
                      className="w-full h-32 object-contain mb-2"
                    />
                  ) : (
                    <div className="w-full h-32 bg-slate-700 text-center flex items-center justify-center mb-2">
                      No image
                    </div>
                  )}
                  <div className="text-sm text-center">{c.Player}</div>
                  <div className="text-xs text-slate-400">#{c.CardNumber}</div>
                  <div className="text-xs text-green-400">{c.Value || "$0.00"}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
