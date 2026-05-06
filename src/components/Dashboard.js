export default function Dashboard({ trades }) {

  // ============================
  // BASIC STATS
  // ============================

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

  // ============================
  // WINRATE
  // ============================

  const winrate =
    totalTrades > 0
      ? (
          (wins / totalTrades) * 100
        ).toFixed(1)
      : 0;

  // ============================
  // PNL
  // ============================

  const pnl = trades.reduce(
    (acc, t) => acc + Number(t.pnl),
    0
  );

  // ============================
  // BEST / WORST
  // ============================

  const bestTrade = trades.length
    ? Math.max(
        ...trades.map((t) =>
          Number(t.pnl)
        )
      )
    : 0;

  const worstTrade = trades.length
    ? Math.min(
        ...trades.map((t) =>
          Number(t.pnl)
        )
      )
    : 0;

  // ============================
  // AVG WIN
  // ============================

  const avgWinTrades = trades.filter(
    (t) => Number(t.pnl) > 0
  );

  const avgWin =
    avgWinTrades.length > 0
      ? (
          avgWinTrades.reduce(
            (acc, t) =>
              acc + Number(t.pnl),
            0
          ) / avgWinTrades.length
        ).toFixed(2)
      : 0;

  // ============================
  // AVG LOSS
  // ============================

  const avgLossTrades = trades.filter(
    (t) => Number(t.pnl) < 0
  );

  const avgLoss =
    avgLossTrades.length > 0
      ? (
          avgLossTrades.reduce(
            (acc, t) =>
              acc + Number(t.pnl),
            0
          ) / avgLossTrades.length
        ).toFixed(2)
      : 0;

  // ============================
  // BEST ASSET
  // ============================

  const assetStats = {};

  trades.forEach((t) => {

    if (!assetStats[t.activo]) {

      assetStats[t.activo] = 0;
    }

    assetStats[t.activo] += Number(t.pnl);
  });

  let bestAsset = "-";
  let bestAssetValue = -999999;

  Object.keys(assetStats).forEach((asset) => {

    if (
      assetStats[asset] >
      bestAssetValue
    ) {

      bestAssetValue =
        assetStats[asset];

      bestAsset = asset;
    }

  });

  // ============================
  // UI
  // ============================

  return (

    <div className="stats">

      <div className="stat-card">

        <h3>WINRATE</h3>

        <p>
          {winrate}%
        </p>

      </div>

      <div className="stat-card">

        <h3>PNL TOTAL</h3>

        <p
          className={
            pnl >= 0
              ? "positive"
              : "negative"
          }
        >
          ${pnl.toFixed(2)}
        </p>

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

        <h3>BEST TRADE</h3>

        <p className="positive">
          ${bestTrade}
        </p>

      </div>

      <div className="stat-card">

        <h3>WORST TRADE</h3>

        <p className="negative">
          ${worstTrade}
        </p>

      </div>

      <div className="stat-card">

        <h3>AVG WIN</h3>

        <p className="positive">
          ${avgWin}
        </p>

      </div>

      <div className="stat-card">

        <h3>AVG LOSS</h3>

        <p className="negative">
          ${avgLoss}
        </p>

      </div>

      <div className="stat-card">

        <h3>BEST ASSET</h3>

        <p>
          {bestAsset}
        </p>

      </div>

    </div>
  );
}