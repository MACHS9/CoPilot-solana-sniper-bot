// src/components/ui/TokenCard.jsx

export default function TokenCard({ token }) {
  return (
    <div className="bg-card rounded-xl p-4 border border-white/10 hover:border-accent transition cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">{token.name}</h4>
        <span className="text-sm text-gray-400">{token.symbol}</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-bold">${token.price}</p>
          <p className={`text-sm ${token.change >= 0 ? "text-green-400" : "text-red-400"}`}>
            {token.change}%
          </p>
        </div>

        <div className="text-right text-gray-400 text-sm">
          <p>Liquidity: ${token.liquidity}</p>
          <p>Risk: {token.risk}</p>
        </div>
      </div>
    </div>
  );
}
