import { useState, useEffect } from "react";

const API = "https://orion-backend-8nbf.onrender.com";

export default function TradeModal({
  onClose,
  refreshTrades,
  user,
  tradeToEdit,
}) {

  const [activo, setActivo] = useState("");
  const [tipo, setTipo] = useState("LONG");
  const [mercado, setMercado] = useState("FUTURES");
  const [estado, setEstado] = useState("OPEN");

  const [capital, setCapital] = useState("");
  const [apalancamiento, setApalancamiento] = useState("");

  const [tp, setTp] = useState("");
  const [sl, setSl] = useState("");
  const [be, setBe] = useState("");

  const [pnl, setPnl] = useState("");
  const [porcentaje, setPorcentaje] = useState("");

  const [timeframe, setTimeframe] = useState("5m");
  const [sesion, setSesion] = useState("NY");

  const [notas, setNotas] = useState("");

  // ============================
  // EDIT MODE
  // ============================

  useEffect(() => {

    if (tradeToEdit) {

      setActivo(tradeToEdit.activo || "");
      setTipo(tradeToEdit.tipo || "LONG");
      setMercado(tradeToEdit.mercado || "FUTURES");
      setEstado(tradeToEdit.estado || "OPEN");

      setCapital(tradeToEdit.capital || "");
      setApalancamiento(tradeToEdit.apalancamiento || "");

      setTp(tradeToEdit.tp || "");
      setSl(tradeToEdit.sl || "");
      setBe(tradeToEdit.be || "");

      setPnl(tradeToEdit.pnl || "");
      setPorcentaje(tradeToEdit.porcentaje || "");

      setTimeframe(tradeToEdit.timeframe || "5m");
      setSesion(tradeToEdit.sesion || "NY");

      setNotas(tradeToEdit.notas || "");

    }

  }, [tradeToEdit]);

  // ============================
  // SAVE
  // ============================

  const guardar = async () => {

    const body = {

      user_id: user,

      activo,
      tipo,
      mercado,
      estado,

      capital: Number(capital),
      apalancamiento: Number(apalancamiento),

      tp: Number(tp),
      sl: Number(sl),
      be: Number(be),

      pnl: Number(pnl),
      porcentaje: Number(porcentaje),

      timeframe,
      sesion,

      notas,

      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),

    };

    // ============================
    // EDIT
    // ============================

    if (tradeToEdit) {

      await fetch(API + "/trades/" + tradeToEdit.id, {

        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(body),

      });

    }

    // ============================
    // CREATE
    // ============================

    else {

      await fetch(API + "/trades", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(body),

      });

    }

    refreshTrades();

    onClose();

  };

  return (

    <div className="modal">

      <div className="modal-box large">

        <h2>
          {tradeToEdit
            ? "Editar operación"
            : "Nueva operación"}
        </h2>

        {/* ROW 1 */}

        <div className="form-row">

          <input
            placeholder="Activo"
            value={activo}
            onChange={(e) =>
              setActivo(e.target.value)
            }
          />

          <select
            value={tipo}
            onChange={(e) =>
              setTipo(e.target.value)
            }
          >
            <option>LONG</option>
            <option>SHORT</option>
          </select>

          <select
            value={mercado}
            onChange={(e) =>
              setMercado(e.target.value)
            }
          >
            <option>FUTURES</option>
            <option>SPOT</option>
          </select>

        </div>

        {/* ROW 2 */}

        <div className="form-row">

          <input
            type="number"
            placeholder="Capital"
            value={capital}
            onChange={(e) =>
              setCapital(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Leverage"
            value={apalancamiento}
            onChange={(e) =>
              setApalancamiento(e.target.value)
            }
          />

          <select
            value={estado}
            onChange={(e) =>
              setEstado(e.target.value)
            }
          >
            <option>OPEN</option>
            <option>WIN</option>
            <option>LOSS</option>
          </select>

        </div>

        {/* ROW 3 */}

        <div className="form-row">

          <input
            type="number"
            placeholder="TP"
            value={tp}
            onChange={(e) =>
              setTp(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="SL"
            value={sl}
            onChange={(e) =>
              setSl(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="BE"
            value={be}
            onChange={(e) =>
              setBe(e.target.value)
            }
          />

        </div>

        {/* ROW 4 */}

        <div className="form-row">

          <input
            type="number"
            placeholder="PNL"
            value={pnl}
            onChange={(e) =>
              setPnl(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="%"
            value={porcentaje}
            onChange={(e) =>
              setPorcentaje(e.target.value)
            }
          />

          <select
            value={timeframe}
            onChange={(e) =>
              setTimeframe(e.target.value)
            }
          >
            <option>5m</option>
            <option>15m</option>
            <option>1H</option>
            <option>4H</option>
            <option>1D</option>
          </select>

        </div>

        {/* ROW 5 */}

        <div className="form-row">

          <select
            value={sesion}
            onChange={(e) =>
              setSesion(e.target.value)
            }
          >
            <option>Asia</option>
            <option>London</option>
            <option>NY</option>
          </select>

        </div>

        {/* NOTES */}

        <textarea
          placeholder="Notas..."
          value={notas}
          onChange={(e) =>
            setNotas(e.target.value)
          }
        />

        {/* ACTIONS */}

        <div className="modal-actions">

          <button
            className="save-btn"
            onClick={guardar}
          >
            Guardar
          </button>

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancelar
          </button>

        </div>

      </div>

    </div>
  );
}