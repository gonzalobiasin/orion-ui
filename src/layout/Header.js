export default function Header({onOpen}){
  return (
    <div className="header">
      <h1>Bitácora</h1>
      <button className="btn-primary" onClick={onOpen}>
        + NUEVA OPERACIÓN
      </button>
    </div>
  );
}