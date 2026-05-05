export default function Dashboard({ trades }) {
  if (!trades || !Array.isArray(trades)) {
    return <div>Cargando...</div>;
  }

  const wins = trades.filter((t) => t.resultado === "WIN").length;
  const losses = trades.filter((t) => t.resultado === "LOSS").length;
  const total = trades.length;
  const winrate = total ? ((wins / total) * 100).toFixed(1) : 0;

  return (
    <div className="cards">
      <div className="card">
        <h4>Total</h4>
        <p>{total}</p>
      </div>

      <div className="card">
        <h4>Winrate</h4>
        <p className="green">{winrate}%</p>
      </div>

      <div className="card">
        <h4>Wins</h4>
        <p className="green">{wins}</p>
      </div>

      <div className="card">
        <h4>Losses</h4>
        <p className="red">{losses}</p>
      </div>
    </div>
  );
}