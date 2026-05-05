export default function Dashboard({ trades }) {
  const wins = trades.filter(t => t.resultado === "WIN").length;
  const losses = trades.filter(t => t.resultado === "LOSS").length;
  const open = trades.filter(t => t.resultado === "OPEN").length;

  const pnl = trades.reduce((acc, t) => acc + (t.pnl || 0), 0);

  return (
    <div className="dashboard">
      <div className="card">WIN: {wins}</div>
      <div className="card red">LOSS: {losses}</div>
      <div className="card blue">OPEN: {open}</div>
      <div className="card green">PNL: ${pnl}</div>
    </div>
  );
}