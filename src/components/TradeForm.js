import { useState } from "react";

const API = "https://orion-backend-8nbf.onrender.com";

export default function TradeForm({ open, onClose, userId, onSave }) {
  const [tipo, setTipo] = useState("LONG");
  const [activo, setActivo] = useState("");
  const [capital, setCapital] = useState(100);
  const [riesgo, setRiesgo] = useState(1);
  const [resultado, setResultado] = useState("WIN");

  if (!open) return null;

  const pnl = resultado === "WIN"
    ? capital * (riesgo / 100) * 2
    : -(capital * (riesgo / 100));

  const guardar = async () => {
    await fetch(API + "/trades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        activo,
        tipo,
        resultado,
        pnl,
      }),
    });

    onSave();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <h3>Nueva operación</h3>

        <div className="toggle">
          <button
            className={tipo === "LONG" ? "long active" : ""}
            onClick={() => setTipo("LONG")}
          >
            LONG
          </button>

          <button
            className={tipo === "SHORT" ? "short active" : ""}
            onClick={() => setTipo("SHORT")}
          >
            SHORT
          </button>
        </div>

        <input placeholder="Activo" onChange={(e) => setActivo(e.target.value)} />

        <input type="number" placeholder="Capital" onChange={(e) => setCapital(Number(e.target.value))} />

        <input type="number" placeholder="Riesgo %" onChange={(e) => setRiesgo(Number(e.target.value))} />

        <select onChange={(e) => setResultado(e.target.value)}>
          <option value="WIN">WIN</option>
          <option value="LOSS">LOSS</option>
        </select>

        <button className="btn-save" onClick={guardar}>
          Guardar
        </button>

        <button className="btn-cancel" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
}