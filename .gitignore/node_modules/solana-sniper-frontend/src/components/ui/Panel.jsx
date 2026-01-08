// src/components/ui/Panel.jsx

export default function Panel({ title, children }) {
  return (
    <div className="bg-panel rounded-xl p-5 border border-white/10 shadow-lg">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-white/90">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
