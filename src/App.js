import { useState } from "react";
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

  const login = async () => {
    try {
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
        alert("Error en login");
      }
    } catch {
      alert("Error conexión backend");
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

  if (!userId) {
    return (
      <div className="container">
        <h1 className="title">Orion Journal 🚀</h1>

        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="btn-group">
          <button className="btn" onClick={login}>Login</button>
          <button className="btn-outline" onClick={register}>Register</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Orion Journal 🚀</h1>

      <div className="card">
        <h2>Nuevo Trade</h2>

        <input
          className="input"
          placeholder="Activo"
          value={activo}
          onChange={(e) => setActivo(e.target.value)}
        />

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

      <h2 className="subtitle">Historial</h2>

      <div className="grid">
        {trades.map((t) => (
          <div key={t.id} className="trade-card">
            <strong>{t.activo}</strong>
            <p>{t.tipo} - {t.resultado}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;