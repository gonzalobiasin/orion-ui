import { useState } from "react";
import "./App.css";

import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";

import Dashboard from "./components/Dashboard";
import TradeForm from "./components/TradeForm";
import TradeList from "./components/TradeList";

const API = "https://orion-backend-8nbf.onrender.com";

function App() {
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [trades, setTrades] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const login = async () => {
    const res = await fetch(API + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.user_id) {
      setUserId(data.user_id);
      loadTrades(data.user_id);
    } else {
      alert("Login incorrecto");
    }
  };

  const loadTrades = async (uid) => {
    const res = await fetch(API + "/trades/" + uid);
    const data = await res.json();
    setTrades(data);
  };

  if (!userId) {
    return (
      <div className="login">
        <h1>Orion Journal 🚀</h1>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Header onOpen={() => setOpenModal(true)} />

        <Dashboard trades={trades} />

        <TradeList trades={trades} />

        <TradeForm
          open={openModal}
          onClose={() => setOpenModal(false)}
          userId={userId}
          onTradeCreated={() => loadTrades(userId)}
        />
      </div>
    </div>
  );
}

export default App;