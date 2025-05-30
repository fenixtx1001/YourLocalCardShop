export function Card({ children, ...props }) {
  return (
    <div className="border border-slate-700 rounded-xl bg-slate-800 p-4" {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, ...props }) {
  return (
    <div className="mt-2" {...props}>
      {children}
    </div>
  );
}
