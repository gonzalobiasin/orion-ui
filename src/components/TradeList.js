export default function TradeList({ trades }) {
  return (
    <div className="trade-list">
      <h3>Historial</h3>

      {trades.map((t) => (
        <div key={t.id} className={`trade ${t.resultado}`}>
          <div>{t.activo}</div>
          <div>{t.tipo}</div>
          <div>${t.pnl}</div>
        </div>
      ))}
    </div>
  );
}