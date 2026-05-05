export default function Dashboard({ trades }) {

  const wins = trades.filter(
    (t) => t.estado === "WIN"
  ).length;

  const losses = trades.filter(
    (t) => t.estado === "LOSS"
  ).length;

  const open = trades.filter(
    (t) => t.estado === "OPEN"
  ).length;

  const totalTrades = wins + losses;

  const winrate =
    totalTrades > 0
      ? (
          (wins / totalTrades) * 100
        ).toFixed(1)
      : 0;

  const pnl = trades.reduce(
    (acc, t) => acc + t.pnl,
    0
  );

  const bestTrade = Math.max(
    ...trades.map((t) => t.pnl),
    0
  );

  const worstTrade = Math.min(
    ...trades.map((t) => t.pnl),
    0
  );

  return (
    <div className="stats">

      <div className="stat-card">
        <h3>WINRATE</h3>
        <p>{winrate}%</p>
      </div>

      <div className="stat-card">
        <h3>PNL</h3>
        <p>${pnl}</p>
      </div>

      <div className="stat-card">
        <h3>WINS</h3>
        <p>{wins}</p>
      </div>

      <div className="stat-card">
        <h3>LOSSES</h3>
        <p>{losses}</p>
      </div>

      <div className="stat-card">
        <h3>OPEN</h3>
        <p>{open}</p>
      </div>

      <div className="stat-card">
        <h3>BEST</h3>
        <p>${bestTrade}</p>
      </div>

      <div className="stat-card">
        <h3>WORST</h3>
        <p>${worstTrade}</p>
      </div>

    </div>
  );
}