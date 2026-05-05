import { useEffect, useState } from "react";

import "./App.css";

import Login from "./Login";

import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";

import Dashboard from "./components/Dashboard";
import TradeList from "./components/TradeList";
import TradeForm from "./components/TradeForm";

const API = "https://orion-backend-8nbf.onrender.com";

export default function App() {

  const [userId, setUserId] = useState(
    localStorage.getItem("user_id")
  );

  const [trades, setTrades] = useState([]);

  const [showModal, setShowModal] =
    useState(false);

  // LOAD TRADES
  const loadTrades = async () => {

    if (!userId) return;

    const res = await fetch(
      API + "/trades/" + userId
    );

    const data = await res.json();

    setTrades(data);
  };

  useEffect(() => {

    loadTrades();

  }, [userId]);

  // DELETE
  const deleteTrade = async (id) => {

    await fetch(API + "/trades/" + id, {
      method: "DELETE",
    });

    loadTrades();
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("user_id");

    setUserId(null);
  };

  // LOGIN
  if (!userId) {

    return (
      <Login setUserId={setUserId} />
    );
  }

  return (
    <div className="app">

      <Sidebar />

      <div className="main">

        <Header
          onNewTrade={() =>
            setShowModal(true)
          }

          logout={logout}
        />

        <Dashboard trades={trades} />

        <TradeList
          trades={trades}
          deleteTrade={deleteTrade}
        />

        <TradeForm
          open={showModal}
          onClose={() =>
            setShowModal(false)
          }
          onSave={loadTrades}
        />

      </div>
    </div>
  );
}