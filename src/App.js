import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import TradeForm from "./components/TradeForm";
import TradeList from "./components/TradeList";

const API = "https://orion-backend-8nbf.onrender.com";

function App() {
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [trades, setTrades] = useState([]);

  const login = async () => {
    const res = await fetch(API + "/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password})
    });

    const data = await res.json();
    if(data.user_id){
      setUserId(data.user_id);
      loadTrades(data.user_id);
    }
  };

  const register = async () => {
    await fetch(API + "/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password})
    });
    alert("Usuario creado");
  };

  const loadTrades = async (uid) => {
    const res = await fetch(API + "/trades/" + uid);
    const data = await res.json();
    setTrades(data);
  };

  if(!userId){
    return (
      <div className="login">
        <h1>Orion Journal 🚀</h1>
        <input placeholder="email" onChange={e=>setEmail(e.target.value)}/>
        <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
        <button onClick={login}>Login</button>
        <button onClick={register}>Register</button>
      </div>
    );
  }

  return (
    <div className="app">
      <Dashboard trades={trades}/>
      <TradeForm userId={userId} onTradeCreated={()=>loadTrades(userId)}/>
      <TradeList trades={trades}/>
    </div>
  );
}

export default App;