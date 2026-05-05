import { useState } from "react";

const API = "https://orion-backend-8nbf.onrender.com";

export default function TradeForm({ open, onClose, onSave }) {
  const [activo, setActivo] = useState("");
  const [tipo, setTipo] = useState("LONG");
  const [resultado, setResultado] = useState("OPEN");
  const [porcentaje, setPorcentaje] = useState(1);

  if (!open) return null;

  const guardar = async () => {
    const pnl = resultado === "WIN" ? porcentaje * 10 : resultado === "LOSS" ? -10 : 0;

    await fetch(API + "/trades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activo,
        tipo,
        resultado,
        porcentaje,
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

        <input placeholder="Activo" onChange={(e) => setActivo(e.target.value)} />

        <select onChange={(e) => setTipo(e.target.value)}>
          <option>LONG</option>
          <option>SHORT</option>
        </select>

        <select onChange={(e) => setResultado(e.target.value)}>
          <option value="OPEN">EN CURSO</option>
          <option value="WIN">WIN</option>
          <option value="LOSS">LOSS</option>
        </select>

        <input
          type="number"
          placeholder="%"
          onChange={(e) => setPorcentaje(Number(e.target.value))}
        />

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