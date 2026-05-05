import { useState } from "react";
import Sidebar from "../layout/Sidebar";
import TradeModal from "./TradeModal";
import TradeList from "./TradeList";

export default function Dashboard() {
  const [trades, setTrades] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addTrade = (trade) => {
    setTrades([...trades, trade]);
  };

  const deleteTrade = (index) => {
    const updated = trades.filter((_, i) => i !== index);
    setTrades(updated);
  };

  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <button className="btn-new" onClick={() => setShowModal(true)}>
          + Nueva operación
        </button>

        {showModal && (
          <TradeModal
            onClose={() => setShowModal(false)}
            onSave={addTrade}
          />
        )}

        <TradeList trades={trades} onDelete={deleteTrade} />
      </div>
    </div>
  );
}