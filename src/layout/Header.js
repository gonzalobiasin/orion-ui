export default function Header({
  onNewTrade,
  logout
}) {

  return (

    <div className="header">

      <div>

        <h1>
          Orion Journal
        </h1>

        <p
          style={{
            color: "#9ca3af",
            marginTop: "8px"
          }}
        >
          Trading Journal Profesional
        </p>

      </div>

      <div
        style={{
          display: "flex",
          gap: "12px"
        }}
      >

        <button
          className="btn-primary"
          onClick={onNewTrade}
        >
          + Nueva operación
        </button>

        <button
          className="cancel-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}