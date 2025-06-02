export default function Bank() {
  const balance = "$25.00"; // Replace with dynamic state later
  return (
    <div className="text-white bg-green-800 p-4 rounded shadow text-center mb-4">
      <h2 className="text-lg font-semibold">Bank</h2>
      <p className="text-2xl">{balance}</p>
    </div>
  );
}
