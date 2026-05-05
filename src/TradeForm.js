import { useState } from "react";

const API = "https://orion-backend-8nbf.onrender.com";

const cryptos = ["BTC","ETH","SOL","XRP","GOLD","OIL","NAS100","SPX"];

export default function TradeForm({userId, onTradeCreated}){

  const [show, setShow] = useState(false);
  const [activo, setActivo] = useState("");
  const [tipo, setTipo] = useState("LONG");
  const [riesgo, setRiesgo] = useState(1);
  const [capital, setCapital] = useState(100);
  const [rr, setRr] = useState(2);
  const [nota, setNota] = useState("");

  const calcularPnL = ()=>{
    if(tipo==="LONG") return capital * (riesgo/100) * rr;
    return -(capital * (riesgo/100));
  };

  const crear = async ()=>{
    await fetch(API+"/trades",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        user_id:userId,
        activo,
        tipo,
        pnl: calcularPnL(),
        nota
      })
    });

    setShow(false);
    onTradeCreated();
  };

  return (
    <>
      <button className="btn-open" onClick={()=>setShow(true)}>
        + NUEVA OPERACIÓN
      </button>

      {show && (
        <div className="modal">

          <div className="modal-box">

            <h2>Nueva Operación</h2>

            <div className="toggle">
              <button 
                className={tipo==="LONG" ? "active long" : ""}
                onClick={()=>setTipo("LONG")}
              >
                LONG
              </button>

              <button 
                className={tipo==="SHORT" ? "active short" : ""}
                onClick={()=>setTipo("SHORT")}
              >
                SHORT
              </button>
            </div>

            <input
              placeholder="Buscar crypto..."
              onChange={(e)=>setActivo(e.target.value.toUpperCase())}
            />

            <div className="crypto-list">
              {cryptos
                .filter(c => c.includes(activo))
                .map(c=>(
                  <div key={c} onClick={()=>setActivo(c)}>
                    {c}
                  </div>
              ))}
            </div>

            <div className="grid">

              <div>
                <label>Riesgo %</label>
                <input type="number" value={riesgo} onChange={e=>setRiesgo(e.target.value)}/>
              </div>

              <div>
                <label>Capital</label>
                <input type="number" value={capital} onChange={e=>setCapital(e.target.value)}/>
              </div>

              <div>
                <label>RR</label>
                <input type="number" value={rr} onChange={e=>setRr(e.target.value)}/>
              </div>

            </div>

            <textarea
              placeholder="Notas del trade..."
              onChange={e=>setNota(e.target.value)}
            />

            <button className="btn-save" onClick={crear}>
              {tipo==="LONG" ? "Abrir LONG" : "Abrir SHORT"}
            </button>

          </div>
        </div>
      )}
    </>
  );
}