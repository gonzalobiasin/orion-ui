import { useEffect, useState } from "react";

import "./App.css";

import Login from "./Login";

import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";

import Dashboard from "./components/Dashboard";
import TradeList from "./components/TradeList";
import TradeModal from "./components/TradeModal";

import EquityChart from "./components/EquityChart";
import AdvancedStats from "./components/AdvancedStats";
import TradingCalendar from "./components/TradingCalendar";

const API = "https://orion-backend-8nbf.onrender.com";

export default function App() {

  // ============================
  // USER
  // ============================

  const [userId, setUserId] = useState(
    localStorage.getItem("user_id")
  );

  // ============================
  // TRADES
  // ============================

  const [trades, setTrades] = useState([]);

  // ============================
  // FILTERS
  // ============================

  const [search, setSearch] =
    useState("");

  const [filterEstado, setFilterEstado] =
    useState("ALL");

  const [filterTF, setFilterTF] =
    useState("ALL");

  const [filterSesion, setFilterSesion] =
    useState("ALL");

  // ============================
  // MODAL
  // ============================

  const [showModal, setShowModal] =
    useState(false);

  // ============================
  // EDIT MODE
  // ============================

  const [tradeToEdit, setTradeToEdit] =
    useState(null);

  // ============================
  // LOAD TRADES
  // ============================

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

  // ============================
  // DELETE
  // ============================

  const deleteTrade = async (id) => {

    await fetch(API + "/trades/" + id, {

      method: "DELETE",

    });

    loadTrades();
  };

  // ============================
  // EDIT
  // ============================

  const editTrade = (trade) => {

    setTradeToEdit(trade);

    setShowModal(true);
  };

  // ============================
  // NEW TRADE
  // ============================

  const newTrade = () => {

    setTradeToEdit(null);

    setShowModal(true);
  };

  // ============================
  // FILTER LOGIC
  // ============================

  const filteredTrades = trades.filter(
    (t) => {

      const matchSearch =
        t.activo
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchEstado =
        filterEstado === "ALL"
          ? true
          : t.estado === filterEstado;

      const matchTF =
        filterTF === "ALL"
          ? true
          : t.timeframe === filterTF;

      const matchSesion =
        filterSesion === "ALL"
          ? true
          : t.sesion === filterSesion;

      return (
        matchSearch &&
        matchEstado &&
        matchTF &&
        matchSesion
      );
    }
  );

  // ============================
  // LOGOUT
  // ============================

  const logout = () => {

    localStorage.removeItem("user_id");

    setUserId(null);
  };

  // ============================
  // LOGIN
  // ============================

  if (!userId) {

    return (
      <Login setUserId={setUserId} />
    );
  }

  // ============================
  // UI
  // ============================

  return (

    <div className="app">

      <Sidebar />

      <div className="main">

        <Header
          onNewTrade={newTrade}
          logout={logout}
        />

        <Dashboard trades={trades} />

        <AdvancedStats trades={trades} />

        <EquityChart trades={trades} />

        <TradingCalendar trades={trades} />

        {/* FILTERS */}

        <div className="filters">

          <input
            placeholder="Buscar activo..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <select
            value={filterEstado}
            onChange={(e) =>
              setFilterEstado(
                e.target.value
              )
            }
          >
            <option value="ALL">
              Todos
            </option>

            <option value="WIN">
              WIN
            </option>

            <option value="LOSS">
              LOSS
            </option>

            <option value="OPEN">
              OPEN
            </option>

          </select>

          <select
            value={filterTF}
            onChange={(e) =>
              setFilterTF(
                e.target.value
              )
            }
          >
            <option value="ALL">
              Todos TF
            </option>

            <option>5m</option>
            <option>15m</option>
            <option>1H</option>
            <option>4H</option>
            <option>1D</option>

          </select>

          <select
            value={filterSesion}
            onChange={(e) =>
              setFilterSesion(
                e.target.value
              )
            }
          >
            <option value="ALL">
              Todas
            </option>

            <option>
              Asia
            </option>

            <option>
              London
            </option>

            <option>
              NY
            </option>

          </select>

        </div>

        <TradeList
          trades={filteredTrades}
          deleteTrade={deleteTrade}
          editTrade={editTrade}
        />

        {showModal && (

          <TradeModal

            user={userId}

            tradeToEdit={tradeToEdit}

            refreshTrades={loadTrades}

            onClose={() =>
              setShowModal(false)
            }

          />

        )}

      </div>

    </div>
  );
}