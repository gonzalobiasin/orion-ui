import { useState } from "react";

const API = "https://orion-backend-8nbf.onrender.com";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch(API + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.status !== 200) {
      alert("Login incorrecto");
      return;
    }

    const data = await res.json();
    setUser(data.user_id);
  };

  const register = async () => {
    await fetch(API + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    alert("Usuario creado");
  };

  return (
    <div className="login">
      <h2>Orion Journal 🚀</h2>

      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={login}>Login</button>
      <button onClick={register}>Register</button>
    </div>
  );
}