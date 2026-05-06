import { useState } from "react";

const API =
  "https://orion-backend-8nbf.onrender.com";

export default function TradeModal({

  user,

  tradeToEdit,

  refreshTrades,

  onClose

}) {

  // =====================================
  // STATES
  // =====================================

  const [activo, setActivo] =
    useState(
      tradeToEdit?.activo || ""
    );

  const [tipo, setTipo] =
    useState(
      tradeToEdit?.tipo || "LONG"
    );

  const [mercado, setMercado] =
    useState(
      tradeToEdit?.mercado || "CRYPTO"
    );

  const [estado, setEstado] =
    useState(
      tradeToEdit?.estado || "OPEN"
    );

  const [capital, setCapital] =
    useState(
      tradeToEdit?.capital || 0
    );

  const [
    apalancamiento,
    setApalancamiento
  ] = useState(
    tradeToEdit?.apalancamiento || 1
  );

  const [tp, setTp] =
    useState(
      tradeToEdit?.tp || 0
    );

  const [sl, setSl] =
    useState(
      tradeToEdit?.sl || 0
    );

  const [be, setBe] =
    useState(
      tradeToEdit?.be || 0
    );

  const [riesgo, setRiesgo] =
    useState(
      tradeToEdit?.riesgo || 0
    );

  const [rr, setRr] =
    useState(
      tradeToEdit?.rr || 0
    );

  const [pnl, setPnl] =
    useState(
      tradeToEdit?.pnl || 0
    );

  const [
    porcentaje,
    setPorcentaje
  ] = useState(
    tradeToEdit?.porcentaje || 0
  );

  const [timeframe, setTimeframe] =
    useState(
      tradeToEdit?.timeframe || "5m"
    );

  const [sesion, setSesion] =
    useState(
      tradeToEdit?.sesion || "NY"
    );

  const [notas, setNotas] =
    useState(
      tradeToEdit?.notas || ""
    );

  const [
    screenshot,
    setScreenshot
  ] = useState(
    tradeToEdit?.screenshot || ""
  );

  const [fecha, setFecha] =
    useState(
      tradeToEdit?.fecha || ""
    );

  const [hora, setHora] =
    useState(
      tradeToEdit?.hora || ""
    );

  // =====================================
  // IMAGE UPLOAD
  // =====================================

  const handleImage = (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend = () => {

      setScreenshot(
        reader.result
      );
    };

    reader.readAsDataURL(file);
  };

  // =====================================
  // SAVE
  // =====================================

  const saveTrade = async () => {

    const payload = {

      user_id: Number(user),

      activo,
      tipo,
      mercado,

      estado,

      capital:
        Number(capital),

      apalancamiento:
        Number(apalancamiento),

      tp: Number(tp),

      sl: Number(sl),

      be: Number(be),

      riesgo:
        Number(riesgo),

      rr: Number(rr),

      pnl: Number(pnl),

      porcentaje:
        Number(porcentaje),

      timeframe,

      sesion,

      notas,

      screenshot,

      fecha,

      hora
    };

    // EDIT

    if (tradeToEdit) {

      await fetch(
        API +
          "/trades/" +
          tradeToEdit.id,
        {

          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            payload
          ),

        }
      );

    } else {

      // CREATE

      await fetch(
        API + "/trades",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            payload
          ),

        }
      );
    }

    refreshTrades();

    onClose();
  };

  // =====================================
  // UI
  // =====================================

  return (

    <div className="modal">

      <div className="modal-box">

        <h2>

          {tradeToEdit
            ? "Editar Trade"
            : "Nuevo Trade"}

        </h2>

        {/* ROW 1 */}

        <div className="form-row">

          <input
            placeholder="Activo"
            value={activo}
            onChange={(e) =>
              setActivo(
                e.target.value
              )
            }
          />

          <select
            value={tipo}
            onChange={(e) =>
              setTipo(
                e.target.value
              )
            }
          >

            <option>
              LONG
            </option>

            <option>
              SHORT
            </option>

          </select>

          <select
            value={mercado}
            onChange={(e) =>
              setMercado(
                e.target.value
              )
            }
          >

            <option>
              CRYPTO
            </option>

            <option>
              FOREX
            </option>

            <option>
              STOCKS
            </option>

          </select>

        </div>

        {/* ROW 2 */}

        <div className="form-row">

          <select
            value={estado}
            onChange={(e) =>
              setEstado(
                e.target.value
              )
            }
          >

            <option>
              OPEN
            </option>

            <option>
              WIN
            </option>

            <option>
              LOSS
            </option>

          </select>

          <input
            type="number"
            placeholder="Capital"
            value={capital}
            onChange={(e) =>
              setCapital(
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="Leverage"
            value={
              apalancamiento
            }
            onChange={(e) =>
              setApalancamiento(
                e.target.value
              )
            }
          />

        </div>

        {/* ROW 3 */}

        <div className="form-row">

          <input
            type="number"
            placeholder="TP"
            value={tp}
            onChange={(e) =>
              setTp(
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="SL"
            value={sl}
            onChange={(e) =>
              setSl(
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="BE"
            value={be}
            onChange={(e) =>
              setBe(
                e.target.value
              )
            }
          />

        </div>

        {/* ROW 4 */}

        <div className="form-row">

          <input
            type="number"
            placeholder="Riesgo"
            value={riesgo}
            onChange={(e) =>
              setRiesgo(
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="RR"
            value={rr}
            onChange={(e) =>
              setRr(
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="PNL"
            value={pnl}
            onChange={(e) =>
              setPnl(
                e.target.value
              )
            }
          />

        </div>

        {/* ROW 5 */}

        <div className="form-row">

          <input
            type="number"
            placeholder="% Resultado"
            value={porcentaje}
            onChange={(e) =>
              setPorcentaje(
                e.target.value
              )
            }
          />

          <select
            value={timeframe}
            onChange={(e) =>
              setTimeframe(
                e.target.value
              )
            }
          >

            <option>
              5m
            </option>

            <option>
              15m
            </option>

            <option>
              1H
            </option>

            <option>
              4H
            </option>

            <option>
              1D
            </option>

          </select>

          <select
            value={sesion}
            onChange={(e) =>
              setSesion(
                e.target.value
              )
            }
          >

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

        {/* ROW 6 */}

        <div className="form-row">

          <input
            type="date"
            value={fecha}
            onChange={(e) =>
              setFecha(
                e.target.value
              )
            }
          />

          <input
            type="time"
            value={hora}
            onChange={(e) =>
              setHora(
                e.target.value
              )
            }
          />

        </div>

        {/* NOTES */}

        <textarea
          placeholder="Notas..."
          value={notas}
          onChange={(e) =>
            setNotas(
              e.target.value
            )
          }
        />

        {/* IMAGE */}

        <div
          style={{
            marginTop: "20px"
          }}
        >

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

        </div>

        {/* PREVIEW */}

        {screenshot && (

          <img

            src={screenshot}

            alt="preview"

            className="trade-preview"

          />

        )}

        {/* ACTIONS */}

        <div className="modal-actions">

          <button
            className="save-btn"
            onClick={saveTrade}
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