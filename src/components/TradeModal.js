import { useState } from "react";

export default function TradeModal({ onClose, onSave }) {
  const [symbol, setSymbol] = useState("");
  const [type, setType] = useState("LONG");

  const save = () => {
    onSave({ symbol, type });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Nueva operación</h2>

        <input
          placeholder="Activo"
          onChange={(e) => setSymbol(e.target.value)}
        />

        <select onChange={(e) => setType(e.target.value)}>
          <option>LONG</option>
          <option>SHORT</option>
        </select>

        <button onClick={save}>Guardar</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}