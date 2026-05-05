import { useState } from "react";

const API = "https://orion-backend-8nbf.onrender.com";

export default function TradeForm({
  open,
  onClose,
  onSave,
}) {

  const [activo, setActivo] = useState("");
  const [tipo, setTipo] = useState("LONG");
  const [mercado, setMercado] = useState("FUTURES");

  const [estado, setEstado] = useState("OPEN");

  const [capital, setCapital] = useState("");
  const [apalancamiento, setApalancamiento] = useState("");

  const [tp, setTp] = useState("");
  const [sl, setSl] = useState("");

  const [riesgo, setRiesgo] = useState("");
  const [rr, setRr] = useState("");

  const [porcentaje, setPorcentaje] = useState("");

  const [timeframe, setTimeframe] = useState("15M");
  const [sesion, setSesion] = useState("NY");

  const [notas, setNotas] = useState("");

  if (!open) return null;

  const guardar = async () => {

    const userId = localStorage.getItem("user_id");

    const now = new Date();

    const fecha = now.toLocaleDateString();

    const hora = now.toLocaleTimeString();

    const pnl =
      estado === "WIN"
        ? Number(porcentaje) * 10
        : estado === "LOSS"
        ? -10
        : 0;

    await fetch(API + "/trades", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        user_id: Number(userId),

        activo,
        tipo,
        mercado,

        estado,

        capital: Number(capital),
        apalancamiento: Number(apalancamiento),

        tp: Number(tp),
        sl: Number(sl),
        be: 0,

        riesgo: Number(riesgo),
        rr: Number(rr),

        pnl,
        porcentaje: Number(porcentaje),

        timeframe,
        sesion,

        notas,

        screenshot: "",

        fecha,
        hora,
      }),
    });

    onSave();

    onClose();
  };

  return (
    <div className="modal">

      <div className="modal-content">

        <h2>Nueva operación</h2>

        <input
          placeholder="Activo"
          value={activo}
          onChange={(e) =>
            setActivo(e.target.value)
          }
        />

        <div className="row">

          <select
            value={tipo}
            onChange={(e) =>
              setTipo(e.target.value)
            }
          >
            <option value="LONG">
              LONG
            </option>

            <option value="SHORT">
              SHORT
            </option>
          </select>

          <select
            value={mercado}
            onChange={(e) =>
              setMercado(e.target.value)
            }
          >
            <option value="SPOT">
              SPOT
            </option>

            <option value="FUTURES">
              FUTURES
            </option>
          </select>

        </div>

        <div className="row">

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

        </div>

        <div className="row">

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

        </div>

        <div className="row">

          <input
            type="number"
            placeholder="Riesgo"

            value={riesgo}

            onChange={(e) =>
              setRiesgo(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="RR"

            value={rr}

            onChange={(e) =>
              setRr(e.target.value)
            }
          />

        </div>

        <textarea
          className="notes"

          placeholder="Notas del trade"

          value={notas}

          onChange={(e) =>
            setNotas(e.target.value)
          }
        />

        <div className="row">

          <select
            value={timeframe}
            onChange={(e) =>
              setTimeframe(e.target.value)
            }
          >
            <option>1M</option>
            <option>5M</option>
            <option>15M</option>
            <option>1H</option>
            <option>4H</option>
            <option>1D</option>
          </select>

          <select
            value={sesion}
            onChange={(e) =>
              setSesion(e.target.value)
            }
          >
            <option value="ASIA">
              ASIA
            </option>

            <option value="LONDON">
              LONDON
            </option>

            <option value="NY">
              NEW YORK
            </option>
          </select>

        </div>

        <select
          value={estado}
          onChange={(e) =>
            setEstado(e.target.value)
          }
        >
          <option value="OPEN">
            OPEN
          </option>

          <option value="WIN">
            WIN
          </option>

          <option value="LOSS">
            LOSS
          </option>
        </select>

        <input
          type="number"
          placeholder="% Resultado"

          value={porcentaje}

          onChange={(e) =>
            setPorcentaje(e.target.value)
          }
        />

        <button
          className="btn-save"
          onClick={guardar}
        >
          Guardar operación
        </button>

        <button
          className="btn-cancel"
          onClick={onClose}
        >
          Cancelar
        </button>

      </div>
    </div>
  );
}