import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid

} from "recharts";

export default function EquityChart({
  trades
}) {

  // ============================
  // DATA
  // ============================

  let cumulative = 0;

  const data = [...trades]
    .reverse()
    .map((t, index) => {

      cumulative += Number(t.pnl);

      return {

        name: index + 1,

        pnl: cumulative

      };

    });

  // ============================
  // UI
  // ============================

  return (

    <div className="chart-card">

      <div className="chart-header">

        <h2>
          Equity Curve
        </h2>

      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1f2937"
          />

          <XAxis
            dataKey="name"
            stroke="#9ca3af"
          />

          <YAxis
            stroke="#9ca3af"
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="pnl"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}