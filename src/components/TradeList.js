const API = "https://orion-backend-8nbf.onrender.com";

export default function TradeList({ trades, reload }) {
  const eliminar = async (id) => {
    await fetch(API + "/trades/" + id, {
      method: "DELETE",
    });
    reload();
  };

  return (
    <div className="trade-list">
      {trades.map((t) => (
        <div key={t.id} className={`trade ${t.resultado.toLowerCase()}`}>
          <div>{t.activo}</div>
          <div>{t.tipo}</div>
          <div>{t.resultado}</div>
          <div>${t.pnl}</div>

          <button onClick={() => eliminar(t.id)}>🗑</button>
        </div>
      ))}
    </div>
  );
}