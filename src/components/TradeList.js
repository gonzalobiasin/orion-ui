import { useState } from "react";

const API = "https://orion-backend-8nbf.onrender.com";

export default function TradeList({ trades, onReload }) {

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const eliminar = async (id) => {
    await fetch(API + "/trades/" + id, { method: "DELETE" });
    onReload();
  };

  const editar = (trade) => {
    setEditing(trade.id);
    setForm(trade);
  };

  const guardar = async () => {
    await fetch(API + "/trades/" + editing, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setEditing(null);
    onReload();
  };

  return (
    <div className="trade-list">
      <h3>Historial</h3>

      {trades.map((t) => (
        <div key={t.id} className={`trade ${t.resultado}`}>

          {editing === t.id ? (
            <>
              <input value={form.activo} onChange={(e) => setForm({ ...form, activo: e.target.value })} />

              <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
                <option>LONG</option>
                <option>SHORT</option>
              </select>

              <select value={form.resultado} onChange={(e) => setForm({ ...form, resultado: e.target.value })}>
                <option>WIN</option>
                <option>LOSS</option>
              </select>

              <button onClick={guardar}>Guardar</button>
            </>
          ) : (
            <>
              <div>{t.activo}</div>
              <div>{t.tipo}</div>
              <div>${t.pnl}</div>

              <button onClick={() => editar(t)}>✏️</button>
              <button onClick={() => eliminar(t.id)}>🗑️</button>
            </>
          )}

        </div>
      ))}
    </div>
  );
}