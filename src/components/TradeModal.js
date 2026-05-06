import { useEffect, useState } from "react";

const API =
  "https://orion-backend-8nbf.onrender.com";

export default function TradeModal({

  user,

  onClose,

  refreshTrades,

  tradeToEdit

}) {

  // =====================================
  // STATES
  // =====================================

  const [activo, setActivo] =
    useState("");

  const [tipo, setTipo] =
    useState("LONG");

  const [mercado, setMercado] =
    useState("CRYPTO");

  const [estado, setEstado] =
    useState("OPEN");

  const [capital, setCapital] =
    useState("");

  const [
    apalancamiento,
    setApalancamiento
  ] = useState("");

  const [tp, setTp] =
    useState("");

  const [sl, setSl] =
    useState("");

  const [be, setBe] =
    useState("");

  const [riesgo, setRiesgo] =
    useState("");

  const [rr, setRr] =
    useState("");

  const [pnl, setPnl] =
    useState("");

  const [
    porcentaje,
    setPorcentaje
  ] = useState("");

  const [
    timeframe,
    setTimeframe
  ] = useState("5m");

  const [sesion, setSesion] =
    useState("NY");

  const [fecha, setFecha] =
    useState("");

  const [hora, setHora] =
    useState("");

  const [notas, setNotas] =
    useState("");

  const [
    screenshot,
    setScreenshot
  ] = useState("");

  // =====================================
  // EDIT MODE
  // =====================================

  useEffect(() => {

    if (tradeToEdit) {

      setActivo(
        tradeToEdit.activo || ""
      );

      setTipo(
        tradeToEdit.tipo || "LONG"
      );

      setMercado(
        tradeToEdit.mercado ||
          "CRYPTO"
      );

      setEstado(
        tradeToEdit.estado ||
          "OPEN"
      );

      setCapital(
        tradeToEdit.capital || ""
      );

      setApalancamiento(
        tradeToEdit.apalancamiento ||
          ""
      );

      setTp(
        tradeToEdit.tp || ""
      );

      setSl(
        tradeToEdit.sl || ""
      );

      setBe(
        tradeToEdit.be || ""
      );

      setRiesgo(
        tradeToEdit.riesgo ||
          ""
      );

      setRr(
        tradeToEdit.rr || ""
      );

      setPnl(
        tradeToEdit.pnl || ""
      );

      setPorcentaje(
        tradeToEdit.porcentaje ||
          ""
      );

      setTimeframe(
        tradeToEdit.timeframe ||
          "5m"
      );

      setSesion(
        tradeToEdit.sesion ||
          "NY"
      );

      setFecha(
        tradeToEdit.fecha || ""
      );

      setHora(
        tradeToEdit.hora || ""
      );

      setNotas(
        tradeToEdit.notas || ""
      );

      setScreenshot(
        tradeToEdit.screenshot ||
          ""
      );
    }

  }, [tradeToEdit]);

  // =====================================
  // IMAGE
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

  const saveTrade =
    async () => {

      const body = {

        user_id: Number(user),

        activo,
        tipo,
        mercado,

        estado,

        capital:
          Number(capital) || 0,

        apalancamiento:
          Number(
            apalancamiento
          ) || 1,

        tp:
          Number(tp) || 0,

        sl:
          Number(sl) || 0,

        be:
          Number(be) || 0,

        riesgo:
          Number(riesgo) || 0,

        rr:
          Number(rr) || 0,

        pnl:
          Number(pnl) || 0,

        porcentaje:
          Number(
            porcentaje
          ) || 0,

        timeframe,
        sesion,

        notas,
        screenshot,

        fecha,
        hora,
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
              body
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
              body
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
            : "Nueva Operación"}

        </h2>

        {/* ROW 1 */}

        <div className="form-row">

          <input

            placeholder="Activo (BTC, ETH, SOL...)"

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
              INDICES
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

            placeholder="Apalancamiento"

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

            placeholder="Take Profit"

            value={tp}

            onChange={(e) =>
              setTp(
                e.target.value
              )
            }

          />

          <input

            type="number"

            placeholder="Stop Loss"

            value={sl}

            onChange={(e) =>
              setSl(
                e.target.value
              )
            }

          />

          <input

            type="number"

            placeholder="Break Even"

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

            placeholder="Resultado %"

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

          placeholder="Notas del trade, análisis, emociones, contexto, errores, mejoras..."

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

            onChange={
              handleImage
            }

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

        {/* BUTTONS */}

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