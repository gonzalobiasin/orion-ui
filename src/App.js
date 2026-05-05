import { useState, useEffect } from "react";
import Login from "./Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  return !user ? (
    <Login onLogin={setUser} />
  ) : (
    <Dashboard user={user} />
  );
}

export default App;