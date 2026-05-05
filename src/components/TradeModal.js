import { useState } from "react";

export default function TradeModal({ onSave, onClose }) {
  const [asset, setAsset] = useState("");
  const [type, setType] = useState("long");
  const [result, setResult] = useState("open");

  return (
    <div className="modal">
      <div className="modal-box">
        <h2>Nueva operación</h2>

        <input
          placeholder="Activo"
          value={asset}
          onChange={e => setAsset(e.target.value)}
        />

        <select onChange={e => setType(e.target.value)}>
          <option value="long">LONG</option>
          <option value="short">SHORT</option>
        </select>

        <select onChange={e => setResult(e.target.value)}>
          <option value="open">EN CURSO</option>
          <option value="win">WIN</option>
          <option value="loss">LOSS</option>
        </select>

        <button
          onClick={() => {
            onSave({ asset, type, result });
            onClose();
          }}
        >
          Guardar
        </button>

        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}