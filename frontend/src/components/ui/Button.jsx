// src/components/ui/Button.jsx

export default function Button({ children, onClick, variant = "primary", className = "" }) {
  const base =
    "px-4 py-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-accent/50";

  const styles = {
    primary: "bg-accent hover:bg-accentHover text-white",
    secondary: "bg-white/10 hover:bg-white/20 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
