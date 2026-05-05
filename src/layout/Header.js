export default function Header({
  onNewTrade,
  logout,
}) {

  return (

    <div className="header">

      <div>
        <h1>Orion Journal</h1>

        <p className="subtitle">
          Trading Journal Profesional
        </p>
      </div>

      <div className="header-buttons">

        <button
          className="btn-primary"
          onClick={onNewTrade}
        >
          + Nueva operación
        </button>

        <button
          className="btn-logout"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}