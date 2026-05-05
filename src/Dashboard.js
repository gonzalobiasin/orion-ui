export default function Dashboard({trades}){

  const wins = trades.filter(t=>t.resultado==="WIN").length;
  const losses = trades.filter(t=>t.resultado==="LOSS").length;

  return (
    <div className="dashboard">

      <div className="cards">
        <div>Trades: {trades.length}</div>
        <div>Winrate: {trades.length ? (wins/trades.length*100).toFixed(1) : 0}%</div>
        <div>Wins: {wins}</div>
        <div>Losses: {losses}</div>
      </div>

    </div>
  );
}