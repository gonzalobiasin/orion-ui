export default function TradeList({trades}){

  return (
    <div className="trade-list">
      <h3>Historial</h3>

      {trades.map(t=>(
        <div key={t.id} className={`trade ${t.resultado}`}>
          <div>
            <strong>{t.activo}</strong> ({t.tipo})
          </div>

          <div>
            PnL: ${t.pnl}
          </div>

          <div>
            {t.nota}
          </div>
        </div>
      ))}
    </div>
  );
}