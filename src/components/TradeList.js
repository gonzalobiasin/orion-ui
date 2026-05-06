export default function TradeList({
  trades,
  deleteTrade,
  editTrade,
}) {

  return (

    <div className="trade-list">

      {trades.map((t, i) => (

        <div
          key={i}
          className="trade-card"
        >

          <div className="trade-top">

            <div>
              <h3>{t.activo}</h3>

              <p>
                {t.tipo} • {t.mercado}
              </p>
            </div>

            <div className={t.estado.toLowerCase()}>
              {t.estado}
            </div>

          </div>

          <div className="trade-grid">

            <div>
              <span>Capital</span>
              <strong>${t.capital}</strong>
            </div>

            <div>
              <span>Leverage</span>
              <strong>{t.apalancamiento}x</strong>
            </div>

            <div>
              <span>PNL</span>
              <strong>${t.pnl}</strong>
            </div>

            <div>
              <span>Resultado</span>
              <strong>{t.porcentaje}%</strong>
            </div>

            <div>
              <span>Session</span>
              <strong>{t.sesion}</strong>
            </div>

            <div>
              <span>TF</span>
              <strong>{t.timeframe}</strong>
            </div>

          </div>

          <div className="trade-notes">
            {t.notas}
          </div>

          <div className="trade-actions">

            <button
              className="edit-btn"
              onClick={() => editTrade(t)}
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

      ))}

    </div>
  );
}