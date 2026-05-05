import { useState } from "react";

const API = "https://orion-backend-8nbf.onrender.com";

export default function TradeForm({open, onClose, userId, onTradeCreated}){

  const [tipo, setTipo] = useState("LONG");
  const [activo, setActivo] = useState("");
  const [riesgo, setRiesgo] = useState(1);
  const [capital, setCapital] = useState(100);
  const [nota, setNota] = useState("");

  if(!open) return null;

  const crear = async ()=>{
    await fetch(API+"/trades",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        user_id:userId,
        activo,
        tipo,
        resultado:"WIN",
        pnl: capital * (riesgo/100),
        nota
      })
    });

    onTradeCreated();
    onClose();
  };

  return (
    <div className="modal">

      <div className="modal-box">

        <h2>Nueva Operación</h2>

        <div className="toggle">
          <button 
            className={tipo==="LONG" ? "long active" : ""}
            onClick={()=>setTipo("LONG")}
          >LONG</button>

          <button 
            className={tipo==="SHORT" ? "short active" : ""}
            onClick={()=>setTipo("SHORT")}
          >SHORT</button>
        </div>

        <input placeholder="Crypto" onChange={e=>setActivo(e.target.value)} />

        <input type="number" placeholder="Capital" onChange={e=>setCapital(e.target.value)} />
        <input type="number" placeholder="Riesgo %" onChange={e=>setRiesgo(e.target.value)} />

        <textarea placeholder="Notas..." onChange={e=>setNota(e.target.value)} />

        <button className="btn-save" onClick={crear}>
          Abrir {tipo}
        </button>

      </div>
    </div>
  );
}