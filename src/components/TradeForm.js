import { useState } from "react";
const API="https://orion-backend-8nbf.onrender.com";

export default function TradeForm({open,onClose,userId,onDone}){
  const [tipo,setTipo]=useState("LONG");
  const [activo,setActivo]=useState("");
  const [capital,setCapital]=useState(100);
  const [riesgo,setRiesgo]=useState(1);
  const [resultado,setResultado]=useState("WIN");
  const [nota,setNota]=useState("");

  if(!open) return null;

  const pnl = resultado==="WIN" ? capital*(riesgo/100)*2 : -(capital*(riesgo/100));

  const save=async()=>{
    await fetch(API+"/trades",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({user_id:userId,activo,tipo,resultado,pnl,nota})
    });
    onDone(); onClose();
  };

  return(
    <div className="modal">
      <div className="modal-box">
        <h3>Nueva operación</h3>

        <div className="toggle">
          <button className={`long ${tipo==="LONG"?"active":""}`} onClick={()=>setTipo("LONG")}>LONG</button>
          <button className={`short ${tipo==="SHORT"?"active":""}`} onClick={()=>setTipo("SHORT")}>SHORT</button>
        </div>

        <input placeholder="Activo (BTC, ETH...)" onChange={e=>setActivo(e.target.value)}/>
        <div className="row">
          <input type="number" placeholder="Capital" onChange={e=>setCapital(+e.target.value)}/>
          <input type="number" placeholder="Riesgo %" onChange={e=>setRiesgo(+e.target.value)}/>
        </div>

        <select onChange={e=>setResultado(e.target.value)}>
          <option value="WIN">WIN</option>
          <option value="LOSS">LOSS</option>
        </select>

        <textarea placeholder="Notas..." onChange={e=>setNota(e.target.value)}/>

        <button className="btn-save" onClick={save}>Guardar</button>
        <button className="btn-cancel" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}