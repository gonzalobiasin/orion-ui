export default function Header({ onOpen }) {
  return (
    <div className="header">
      <h2>Bitácora</h2>
      <button className="btn-primary" onClick={onOpen}>
        + Nueva operación
      </button>
    </div>
  );
}