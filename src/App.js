import { useState, useEffect } from "react";
import "./App.css";

const API = "https://orion-backend-8nbf.onrender.com";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const [trades, setTrades] = useState([]);

  const [activo, setActivo] = useState("");
  const [tipo, setTipo] = useState("LONG");
  const [resultado, setResultado] = useState("WIN");

  // ---------------- AUTH ----------------
  const login = async () => {
    const res = await fetch(API + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.user_id) {
      setUserId(data.user_id);
      loadTrades(data.user_id);
    } else {
      alert("Error login");
    }
  };

  const register = async () => {
    await fetch(API + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    alert("Usuario creado");
  };

  // ---------------- TRADES ----------------
  const loadTrades = async (uid) => {
    const res = await fetch(API + "/trades/" + uid);
    const data = await res.json();
    setTrades(data);
  };

  const createTrade = async () => {
    await fetch(API + "/trades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        activo,
        tipo,
        resultado,
      }),
    });

    loadTrades(userId);
    setActivo("");
  };

  // ---------------- STATS ----------------
  const total = trades.length;
  const wins = trades.filter(t => t.resultado === "WIN").length;
  const losses = trades.filter(t => t.resultado === "LOSS").length;
  const winrate = total ? ((wins / total) * 100).toFixed(1) : 0;

  // ---------------- LOGIN UI ----------------
  if (!userId) {
    return (
      <div className="container">
        <h1 className="title">Orion Journal 🚀</h1>

        <input className="input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <div className="btn-group">
          <button className="btn" onClick={login}>Login</button>
          <button className="btn-outline" onClick={register}>Register</button>
        </div>
      </div>
    );
  }

  // ---------------- APP UI ----------------
  return (
    <div className="container">
      <h1 className="title">Orion Journal 🚀</h1>

      {/* DASHBOARD */}
      <div className="dashboard">
        <div className="stat">
          <h3>{total}</h3>
          <p>Total</p>
        </div>
        <div className="stat win">
          <h3>{wins}</h3>
          <p>Wins</p>
        </div>
        <div className="stat loss">
          <h3>{losses}</h3>
          <p>Losses</p>
        </div>
        <div className="stat">
          <h3>{winrate}%</h3>
          <p>Winrate</p>
        </div>
      </div>

      {/* NUEVO TRADE */}
      <div className="card">
        <h2>Nuevo Trade</h2>

        <input className="input" placeholder="Activo" value={activo} onChange={(e) => setActivo(e.target.value)} />

        <div className="row">
          <select className="input" onChange={(e) => setTipo(e.target.value)}>
            <option>LONG</option>
            <option>SHORT</option>
          </select>

          <select className="input" onChange={(e) => setResultado(e.target.value)}>
            <option>WIN</option>
            <option>LOSS</option>
          </select>
        </div>

        <button className="btn" onClick={createTrade}>Guardar</button>
      </div>

      {/* HISTORIAL */}
      <h2 className="subtitle">Historial</h2>

      <div className="grid">
        {trades.map((t) => (
          <div key={t.id} className={`trade-card ${t.resultado === "WIN" ? "win" : "loss"}`}>
            <strong>{t.activo}</strong>
            <p>{t.tipo}</p>
            <span>{t.resultado}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;