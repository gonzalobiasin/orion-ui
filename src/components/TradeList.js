import { useState } from "react";

const API = "https://orion-backend-8nbf.onrender.com";

export default function TradeList({ trades, reload }) {
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});

  if (!trades || !Array.isArray(trades)) {
    return <div>Sin datos...</div>;
  }

  const remove = async (id) => {
    await fetch(API + "/trades/" + id, { method: "DELETE" });
    reload();
  };

  const startEdit = (t) => {
    setEditId(t.id);
    setForm(t);
  };

  const save = async () => {
    await fetch(API + "/trades/" + editId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setEditId(null);
    reload();
  };

  return (
    <div className="trade-list">
      {trades.map((t) => (
        <div key={t.id} className={`trade ${t.resultado === "WIN" ? "win" : "loss"}`}>
          {editId === t.id ? (
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

              <button onClick={save}>Guardar</button>
            </>
          ) : (
            <>
              <div className="trade-info">
                <div>{t.activo}</div>
                <div>{t.tipo}</div>
                <div>${t.pnl}</div>
              </div>

              <div className="trade-actions">
                <button onClick={() => startEdit(t)}>✏️</button>
                <button onClick={() => remove(t.id)}>🗑️</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}