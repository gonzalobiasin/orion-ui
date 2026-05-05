export default function TradeList({ trades, onDelete }) {
  return (
    <div>
      {trades.map((t, i) => (
        <div className="trade" key={i}>
          {t.symbol} - {t.type}
          <button onClick={() => onDelete(i)}>🗑</button>
        </div>
      ))}
    </div>
  );
}