import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function Dashboard({trades}){

  const [filtro, setFiltro] = useState("ALL");

  const filtrar = (t) => {
    if(filtro === "WIN") return t.resultado === "WIN";
    if(filtro === "LOSS") return t.resultado === "LOSS";
    return true;
  };

  const filtrados = trades.filter(filtrar);

  let balance = 0;

  const data = filtrados.map((t, i)=>{
    const pnl = t.pnl || 0;
    balance += pnl;
    return {name:i+1, balance};
  });

  const wins = filtrados.filter(t=>t.resultado==="WIN").length;
  const total = filtrados.length;
  const winrate = total ? (wins/total*100).toFixed(1) : 0;

  return (
    <div className="dashboard">

      <h2>Dashboard</h2>

      <div className="filters">
        <button onClick={()=>setFiltro("ALL")}>ALL</button>
        <button onClick={()=>setFiltro("WIN")}>WIN</button>
        <button onClick={()=>setFiltro("LOSS")}>LOSS</button>
      </div>

      <div className="stats">
        <div>Total: {total}</div>
        <div>Wins: {wins}</div>
        <div>Winrate: {winrate}%</div>
      </div>

      <LineChart width={500} height={250} data={data}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Line type="monotone" dataKey="balance" stroke="#00ff88"/>
      </LineChart>
    </div>
  );
}