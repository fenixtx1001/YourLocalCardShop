export function Button(props) {
  return (
    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow">
      {props.children}
    </button>
  );
}
