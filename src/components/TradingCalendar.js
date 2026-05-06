export default function TradingCalendar({
  trades
}) {

  // ============================
  // GROUP BY DATE
  // ============================

  const grouped = {};

  trades.forEach((t) => {

    if (!grouped[t.fecha]) {

      grouped[t.fecha] = 0;
    }

    grouped[t.fecha] +=
      Number(t.pnl);
  });

  // ============================
  // DATA
  // ============================

  const days =
    Object.entries(grouped);

  // ============================
  // UI
  // ============================

  return (

    <div className="calendar-card">

      <div className="calendar-header">

        <h2>
          Trading Calendar
        </h2>

      </div>

      <div className="calendar-grid">

        {days.map(([date, pnl]) => (

          <div
            key={date}
            className={
              pnl >= 0
                ? "calendar-day positive-day"
                : "calendar-day negative-day"
            }
          >

            <span>
              {date}
            </span>

            <strong>
              ${pnl.toFixed(2)}
            </strong>

          </div>

        ))}

      </div>

    </div>
  );
}