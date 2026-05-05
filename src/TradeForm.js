import { useState } from "react";

const API = "https://orion-backend-8nbf.onrender.com";

export default function TradeForm({userId, onTradeCreated}){

  const [activo, setActivo] = useState("");
  const [tipo, setTipo] = useState("LONG");
  const [resultado, setResultado] = useState("WIN");
  const [capital, setCapital] = useState(100);
  const [riesgo, setRiesgo] = useState(1);
  const [rr, setRr] = useState(2);
  const [nota, setNota] = useState("");

  const calcularPnL = ()=>{
    if(resultado==="WIN") return capital * (riesgo/100) * rr;
    else return -(capital * (riesgo/100));
  };

  const crear = async ()=>{
    await fetch(API+"/trades",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        user_id:userId,
        activo,
        tipo,
        resultado,
        capital,
        riesgo,
        rr,
        pnl: calcularPnL(),
        nota
      })
    });

    onTradeCreated();
  };

  return (
    <div className="trade-form">
      <h3>Nueva Operación</h3>

      <input placeholder="Activo" onChange={e=>setActivo(e.target.value)}/>

      <select onChange={e=>setTipo(e.target.value)}>
        <option>LONG</option>
        <option>SHORT</option>
      </select>

      <input type="number" placeholder="Capital" onChange={e=>setCapital(e.target.value)}/>
      <input type="number" placeholder="Riesgo %" onChange={e=>setRiesgo(e.target.value)}/>
      <input type="number" placeholder="RR (TP/SL)" onChange={e=>setRr(e.target.value)}/>

      <select onChange={e=>setResultado(e.target.value)}>
        <option>WIN</option>
        <option>LOSS</option>
      </select>

      <textarea placeholder="Notas..." onChange={e=>setNota(e.target.value)}/>

      <button onClick={crear}>Guardar Trade</button>
    </div>
  );
}