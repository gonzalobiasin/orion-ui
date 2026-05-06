export default function TradeList({

  trades,

  deleteTrade,

  editTrade

}) {

  // =====================================
  // OPEN
  // =====================================

  const openTrades =
    trades.filter(
      (t) =>
        t.estado === "OPEN"
    );

  // =====================================
  // CLOSED
  // =====================================

  const closedTrades =
    trades.filter(
      (t) =>
        t.estado !== "OPEN"
    );

  // =====================================
  // CARD
  // =====================================

  const renderTrade = (t) => (

    <div
      key={t.id}
      className="trade-card"
    >

      {/* TOP */}

      <div className="trade-top">

        <div>

          <h3>
            {t.activo}
          </h3>

          <p>
            {t.tipo} • {t.mercado}
          </p>

        </div>

        <div
          className={
            t.estado.toLowerCase()
          }
        >
          {t.estado}
        </div>

      </div>

      {/* GRID */}

      <div className="trade-grid">

        <div>

          <span>
            Capital
          </span>

          <strong>
            ${t.capital}
          </strong>

        </div>

        <div>

          <span>
            Leverage
          </span>

          <strong>
            {t.apalancamiento}x
          </strong>

        </div>

        <div>

          <span>
            PNL
          </span>

          <strong>
            ${t.pnl}
          </strong>

        </div>

        <div>

          <span>
            Resultado
          </span>

          <strong>
            {t.porcentaje}%
          </strong>

        </div>

        <div>

          <span>
            Session
          </span>

          <strong>
            {t.sesion}
          </strong>

        </div>

        <div>

          <span>
            TF
          </span>

          <strong>
            {t.timeframe}
          </strong>

        </div>

      </div>

      {/* NOTES */}

      {t.notas && (

        <div className="trade-notes">

          {t.notas}

        </div>

      )}

      {/* SCREENSHOT */}

      {t.screenshot && (

        <div className="trade-image-wrapper">

          <img

            src={t.screenshot}

            alt="trade"

            className="trade-image"

            onClick={() =>
              window.open(
                t.screenshot,
                "_blank"
              )
            }

          />

        </div>

      )}

      {/* ACTIONS */}

      <div className="trade-actions">

        <button
          className="edit-btn"
          onClick={() =>
            editTrade(t)
          }
        >
          ✏️
        </button>

        <button
          className="delete-btn"
          onClick={() =>
            deleteTrade(t.id)
          }
        >
          🗑
        </button>

      </div>

    </div>
  );

  // =====================================
  // UI
  // =====================================

  return (

    <div>

      {/* OPEN */}

      <div className="section-title">

        🚀 Trades en Curso

      </div>

      {openTrades.length > 0 ? (

        openTrades.map(renderTrade)

      ) : (

        <div className="empty-box">

          No hay trades abiertos

        </div>

      )}

      {/* CLOSED */}

      <div
        className="section-title"
        style={{
          marginTop: "40px"
        }}
      >

        ✅ Trades Cerrados

      </div>

      {closedTrades.length > 0 ? (

        closedTrades.map(renderTrade)

      ) : (

        <div className="empty-box">

          No hay trades cerrados

        </div>

      )}

    </div>
  );
}