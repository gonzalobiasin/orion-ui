import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import TradeForm from "./components/TradeForm";
import TradeList from "./components/TradeList";
import "./App.css";

const API = "https://orion-backend-8nbf.onrender.com";

function App() {
  const [trades, setTrades] = useState([]);
  const [open, setOpen] = useState(false);

  const cargar = async () => {
    const res = await fetch(API + "/trades");
    const data = await res.json();
    setTrades(data);
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="app">
      <Dashboard trades={trades} />

      <button className="btn-new" onClick={() => setOpen(true)}>
        + Nueva operación
      </button>

      <TradeForm open={open} onClose={() => setOpen(false)} onSave={cargar} />

      <TradeList trades={trades} reload={cargar} />
    </div>
  );
}

export default App;