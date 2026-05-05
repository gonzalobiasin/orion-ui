import { useState } from "react";
const API="https://orion-backend-8nbf.onrender.com";

export default function TradeList({trades,onReload}){
  const [edit,setEdit]=useState(null);
  const [form,setForm]=useState({});

  const del=async(id)=>{
    await fetch(API+"/trades/"+id,{method:"DELETE"});
    onReload();
  };

  const startEdit=(t)=>{ setEdit(t.id); setForm(t); };

  const save=async()=>{
    await fetch(API+"/trades/"+edit,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(form)
    });
    setEdit(null); onReload();
  };

  return(
    <div className="trade-list">
      {trades.map(t=>(
        <div key={t.id} className={`trade ${t.resultado==="WIN"?"win":"loss"}`}>
          {edit===t.id ? (
            <>
              <input value={form.activo} onChange={e=>setForm({...form,activo:e.target.value})}/>
              <select value={form.tipo} onChange={e=>setForm({...form,tipo:e.target.value})}>
                <option>LONG</option><option>SHORT</option>
              </select>
              <select value={form.resultado} onChange={e=>setForm({...form,resultado:e.target.value})}>
                <option>WIN</option><option>LOSS</option>
              </select>
              <button onClick={save}>Guardar</button>
            </>
          ):(
            <>
              <div className="trade-info">
                <div>{t.activo}</div>
                <div>{t.tipo}</div>
                <div>${t.pnl}</div>
              </div>
              <div className="trade-actions">
                <button onClick={()=>startEdit(t)}>✏️</button>
                <button onClick={()=>del(t.id)}>🗑️</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}