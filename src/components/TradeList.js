const coinLogos = {

  BTC: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=032",

  ETH: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032",

  SOL: "https://cryptologos.cc/logos/solana-sol-logo.png?v=032",

  XRP: "https://cryptologos.cc/logos/xrp-xrp-logo.png?v=032",

  BNB: "https://cryptologos.cc/logos/bnb-bnb-logo.png?v=032",

  DOGE: "https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=032",

  ADA: "https://cryptologos.cc/logos/cardano-ada-logo.png?v=032",

  AVAX: "https://cryptologos.cc/logos/avalanche-avax-logo.png?v=032",

  LINK: "https://cryptologos.cc/logos/chainlink-link-logo.png?v=032",

  TON: "https://cryptologos.cc/logos/toncoin-ton-logo.png?v=032",

  TRX: "https://cryptologos.cc/logos/tron-trx-logo.png?v=032",

  DOT: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=032",

  MATIC: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",

  LTC: "https://cryptologos.cc/logos/litecoin-ltc-logo.png?v=032",

  BCH: "https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png?v=032",

  ATOM: "https://cryptologos.cc/logos/cosmos-atom-logo.png?v=032",

  NEAR: "https://cryptologos.cc/logos/near-protocol-near-logo.png?v=032",

  FIL: "https://cryptologos.cc/logos/filecoin-fil-logo.png?v=032",

  APT: "https://cryptologos.cc/logos/aptos-apt-logo.png?v=032",

  ARB: "https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=032",

};

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
  // GET LOGO
  // =====================================

  const getLogo = (activo) => {

    if (!activo) return null;

    const symbol =
      activo
        .replace("USDT", "")
        .replace("USD", "")
        .toUpperCase();

    return (
      coinLogos[symbol] || null
    );
  };

  // =====================================
  // CARD
  // =====================================

  const renderTrade = (t) => {

    const logo =
      getLogo(t.activo);

    return (

      <div
        key={t.id}
        className="trade-card"
      >

        {/* TOP */}

        <div className="trade-top">

          <div>

            <div className="trade-title-row">

              {logo && (

                <img

                  src={logo}

                  alt="logo"

                  className="coin-logo"

                />

              )}

              <h3>
                {t.activo}
              </h3>

            </div>

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
  };

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