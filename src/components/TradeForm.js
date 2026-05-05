import { useState } from "react";

const API = "https://orion-backend-8nbf.onrender.com";

export default function TradeForm({ open, onClose, onSave }) {
  const [activo, setActivo] = useState("");
  const [tipo, setTipo] = useState("LONG");
  const [resultado, setResultado] = useState("OPEN");
  const [porcentaje, setPorcentaje] = useState("");

  if (!open) return null;

  const guardar = async () => {
    await fetch(API + "/trades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activo,
        tipo,
        resultado,
        porcentaje: Number(porcentaje),
        pnl: resultado === "WIN" ? porcentaje * 10 : resultado === "LOSS" ? -10 : 0,
      }),
    });

    onSave();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">

        <h3>Nueva operación</h3>

        <input placeholder="Activo (BTC, GOLD...)" onChange={(e) => setActivo(e.target.value)} />

        <div className="row">
          <select onChange={(e) => setTipo(e.target.value)}>
            <option>LONG</option>
            <option>SHORT</option>
          </select>

          <select onChange={(e) => setResultado(e.target.value)}>
            <option value="OPEN">EN CURSO</option>
            <option value="WIN">WIN</option>
            <option value="LOSS">LOSS</option>
          </select>
        </div>

        <input
          type="number"
          placeholder="% resultado"
          onChange={(e) => setPorcentaje(e.target.value)}
        />

        <button className="btn-save" onClick={guardar}>
          Guardar operación
        </button>

        <button className="btn-cancel" onClick={onClose}>
          Cancelar
        </button>

      </div>
    </div>
  );
}