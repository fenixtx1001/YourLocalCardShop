export default function Inventory() {
  const items = ["1989 Donruss - Ken Griffey Jr.", "1990 Topps - Frank Thomas"]; // Replace with state
  return (
    <div className="text-white bg-blue-900 p-4 rounded shadow text-center mb-4">
      <h2 className="text-lg font-semibold mb-2">Your Inventory</h2>
      <ul className="list-disc list-inside">
        {items.map((card, idx) => (
          <li key={idx}>{card}</li>
        ))}
      </ul>
    </div>
  );
}
