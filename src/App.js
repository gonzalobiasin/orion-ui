import { useState, useEffect } from "react";
import "./App.css";

const API = "https://orion-journal.onrender.com";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);

  const [asset, setAsset] = useState("");
  const [direction, setDirection] = useState("LONG");
  const [result, setResult] = useState("WIN");

  const [trades, setTrades] = useState([]);

  // ======================
  // AUTH
  // ======================
  const register = async () => {
    await fetch(`${API}/register?email=${email}&password=${password}`, {
      method: "POST"
    });
    alert("Usuario creado");
  };

  const login = async () => {
    const res = await fetch(`${API}/login?email=${email}&password=${password}`, {
      method: "POST"
    });

    const data = await res.json();
    setUserId(data.user_id);
    loadTrades(data.user_id);
  };

  // ======================
  // TRADES
  // ======================
  const loadTrades = async (id) => {
    const res = await fetch(`${API}/trades/${id}`);
    const data = await res.json();
    setTrades(data);
  };

  const saveTrade = async () => {
    await fetch(`${API}/trades?asset=${asset}&direction=${direction}&result=${result}&user_id=${userId}`, {
      method: "POST"
    });
    loadTrades(userId);
  };

  // ======================
  // UI
  // ======================
  if (!userId) {
    return (
      <div className="auth">
        <h1>Orion Journal 🚀</h1>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
        <button onClick={register}>Register</button>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Orion Journal 🚀</h1>

      <div className="form">
        <input placeholder="Activo" onChange={(e) => setAsset(e.target.value)} />

        <select onChange={(e) => setDirection(e.target.value)}>
          <option>LONG</option>
          <option>SHORT</option>
        </select>

        <select onChange={(e) => setResult(e.target.value)}>
          <option>WIN</option>
          <option>LOSS</option>
        </select>

        <button onClick={saveTrade}>Guardar</button>
      </div>

      <h2>Historial</h2>

      {trades.map((t) => (
        <div className="card" key={t.id}>
          <p>{t.asset}</p>
          <p>{t.direction}</p>
          <p>{t.result}</p>
        </div>
      ))}
    </div>
  );
}

export default App;