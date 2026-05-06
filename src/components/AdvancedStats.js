export default function AdvancedStats({
  trades
}) {

  // ============================
  // CLOSED TRADES
  // ============================

  const closedTrades = trades.filter(
    (t) =>
      t.estado === "WIN" ||
      t.estado === "LOSS"
  );

  // ============================
  // GROSS PROFIT
  // ============================

  const grossProfit =
    closedTrades
      .filter((t) =>
        Number(t.pnl) > 0
      )
      .reduce(
        (acc, t) =>
          acc + Number(t.pnl),
        0
      );

  // ============================
  // GROSS LOSS
  // ============================

  const grossLoss =
    Math.abs(
      closedTrades
        .filter((t) =>
          Number(t.pnl) < 0
        )
        .reduce(
          (acc, t) =>
            acc + Number(t.pnl),
          0
        )
    );

  // ============================
  // PROFIT FACTOR
  // ============================

  const profitFactor =
    grossLoss > 0
      ? (
          grossProfit /
          grossLoss
        ).toFixed(2)
      : 0;

  // ============================
  // AVG RR
  // ============================

  const avgRR =
    closedTrades.length > 0
      ? (
          closedTrades.reduce(
            (acc, t) =>
              acc + Number(t.rr || 0),
            0
          ) / closedTrades.length
        ).toFixed(2)
      : 0;

  // ============================
  // LONG WINRATE
  // ============================

  const longTrades =
    closedTrades.filter(
      (t) => t.tipo === "LONG"
    );

  const longWins =
    longTrades.filter(
      (t) => t.estado === "WIN"
    ).length;

  const longWinrate =
    longTrades.length > 0
      ? (
          (longWins /
            longTrades.length) *
          100
        ).toFixed(1)
      : 0;

  // ============================
  // SHORT WINRATE
  // ============================

  const shortTrades =
    closedTrades.filter(
      (t) => t.tipo === "SHORT"
    );

  const shortWins =
    shortTrades.filter(
      (t) => t.estado === "WIN"
    ).length;

  const shortWinrate =
    shortTrades.length > 0
      ? (
          (shortWins /
            shortTrades.length) *
          100
        ).toFixed(1)
      : 0;

  // ============================
  // EXPECTANCY
  // ============================

  const expectancy =
    closedTrades.length > 0
      ? (
          closedTrades.reduce(
            (acc, t) =>
              acc + Number(t.pnl),
            0
          ) / closedTrades.length
        ).toFixed(2)
      : 0;

  // ============================
  // UI
  // ============================

  return (

    <div className="advanced-grid">

      <div className="advanced-card">

        <h3>
          Profit Factor
        </h3>

        <p>
          {profitFactor}
        </p>

      </div>

      <div className="advanced-card">

        <h3>
          Avg RR
        </h3>

        <p>
          {avgRR}
        </p>

      </div>

      <div className="advanced-card">

        <h3>
          LONG WR
        </h3>

        <p>
          {longWinrate}%
        </p>

      </div>

      <div className="advanced-card">

        <h3>
          SHORT WR
        </h3>

        <p>
          {shortWinrate}%
        </p>

      </div>

      <div className="advanced-card">

        <h3>
          Expectancy
        </h3>

        <p>
          ${expectancy}
        </p>

      </div>

    </div>
  );
}