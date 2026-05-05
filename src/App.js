import { useState, useEffect } from "react";

const API = "https://orion-backend-8nbf.onrender.com";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const [trades, setTrades] = useState([]);

  const [activo, setActivo] = useState("");
  const [tipo, setTipo] = useState("LONG");
  const [resultado, setResultado] = useState("WIN");

  // ---------------- LOGIN ----------------
  const login = async () => {
    try {
      const res = await fetch(API + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setUserId(data.user_id);
        loadTrades(data.user_id);
      } else {
        alert(data.detail);
      }
    } catch (err) {
      alert("Error de conexión con backend");
    }
  };

  // ---------------- REGISTER ----------------
  const register = async () => {
    try {
      const res = await fetch(API + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Usuario creado, ahora logueate");
      } else {
        alert(data.detail);
      }
    } catch (err) {
      alert("Error de conexión");
    }
  };

  // ---------------- LOAD TRADES ----------------
  const loadTrades = async (uid) => {
    try {
      const res = await fetch(API + "/trades/" + uid);
      const data = await res.json();
      setTrades(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- CREATE TRADE ----------------
  const createTrade = async () => {
    try {
      const res = await fetch(API + "/trades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          activo,
          tipo,
          resultado,
        }),
      });

      if (res.ok) {
        loadTrades(userId);
        setActivo("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- UI ----------------

  if (!userId) {
    return (
      <div style={{ background: "black", color: "gold", height: "100vh", padding: 40 }}>
        <h1>Orion Journal 🚀</h1>

        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button onClick={login}>Login</button>
        <button onClick={register}>Register</button>
      </div>
    );
  }

  return (
    <div style={{ background: "black", color: "white", minHeight: "100vh", padding: 40 }}>
      <h1 style={{ color: "gold" }}>Orion Journal 🚀</h1>

      <h2>Nuevo Trade</h2>

      <input
        placeholder="Activo"
        value={activo}
        onChange={(e) => setActivo(e.target.value)}
      />

      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option>LONG</option>
        <option>SHORT</option>
      </select>

      <select value={resultado} onChange={(e) => setResultado(e.target.value)}>
        <option>WIN</option>
        <option>LOSS</option>
      </select>

      <button onClick={createTrade}>Guardar</button>

      <h2>Historial</h2>

      {trades.map((t) => (
        <div key={t.id} style={{ border: "1px solid gold", margin: 10, padding: 10 }}>
          {t.activo} - {t.tipo} - {t.resultado}
        </div>
      ))}
    </div>
  );
}

export default App;