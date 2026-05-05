import { useState } from "react";

const API = "https://orion-backend-8nbf.onrender.com";

export default function Login({ setUserId }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 LOGIN
  const login = async () => {

    try {

      const res = await fetch(API + "/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status !== 200) {

        alert("Login incorrecto");

        return;
      }

      const data = await res.json();

      // 🔹 guardar sesión
      localStorage.setItem(
        "user_id",
        data.user_id
      );

      setUserId(data.user_id);

    } catch (err) {

      console.log(err);

      alert("Error en login");
    }
  };

  // 🔹 REGISTER
  const register = async () => {

    try {

      const res = await fetch(API + "/register", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status !== 200) {

        alert("No se pudo registrar");

        return;
      }

      alert("Usuario creado");

    } catch (err) {

      console.log(err);

      alert("Error");
    }
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h1>🚀 Orion Journal</h1>

        <p className="login-subtitle">
          Trading Journal Profesional
        </p>

        <input
          type="email"
          placeholder="Email"

          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Contraseña"

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="btn-login"
          onClick={login}
        >
          Login
        </button>

        <button
          className="btn-register"
          onClick={register}
        >
          Crear cuenta
        </button>

      </div>
    </div>
  );
}