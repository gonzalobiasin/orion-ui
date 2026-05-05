const API = "https://orion-backend-8nbf.onrender.com";

export default function TradeList({ trades, reload }) {

  const eliminar = async (id) => {
    await fetch(API + "/trades/" + id, { method: "DELETE" });
    reload();
  };

  if (!Array.isArray(trades)) return null;

  return (
    <div className="list">

      {trades.map((t) => (
        <div key={t.id} className={`trade ${t.resultado.toLowerCase()}`}>

          <div>
            <strong>{t.activo}</strong>
            <div>{t.tipo} • {t.resultado}</div>
          </div>

          <div>
            <div>${t.pnl}</div>
            <div>{t.porcentaje}%</div>
          </div>

          <button className="btn-delete" onClick={() => eliminar(t.id)}>
            🗑
          </button>

        </div>
      ))}

    </div>
  );
}