import { useState } from "react";

const API =
  "https://orion-backend-8nbf.onrender.com";

export default function Login({
  setUserId
}) {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  // =====================================
  // LOGIN
  // =====================================

  const login = async () => {

    try {

      const res = await fetch(
        API + "/login",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            email,
            password

          }),

        }
      );

      const data =
        await res.json();

      if (data.user_id) {

        localStorage.setItem(
          "user_id",
          data.user_id
        );

        localStorage.setItem(
          "user_email",
          email
        );

        setUserId(
          data.user_id
        );

      } else {

        alert(
          "Login incorrecto"
        );
      }

    } catch {

      alert(
        "Error servidor"
      );
    }
  };

  // =====================================
  // REGISTER
  // =====================================

  const register = async () => {

    try {

      const res = await fetch(
        API + "/register",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            email,
            password

          }),

        }
      );

      const data =
        await res.json();

      if (data.user_id) {

        localStorage.setItem(
          "user_id",
          data.user_id
        );

        localStorage.setItem(
          "user_email",
          email
        );

        setUserId(
          data.user_id
        );

      } else {

        alert(
          "Error"
        );
      }

    } catch {

      alert(
        "Usuario ya existe"
      );
    }
  };

  // =====================================
  // UI
  // =====================================

  return (

    <div className="login-page">

      {/* LEFT */}

      <div className="login-left">

        <div className="login-brand">

          <h1>
            🚀 Orion Journal
          </h1>

          <p>
            Professional Trading
            Analytics Platform
          </p>

        </div>

        <div className="login-stats">

          <div className="login-stat-card">

            <h2>
              +12%
            </h2>

            <span>
              Avg Monthly Growth
            </span>

          </div>

          <div className="login-stat-card">

            <h2>
              74%
            </h2>

            <span>
              Avg Winrate
            </span>

          </div>

          <div className="login-stat-card">

            <h2>
              2.4
            </h2>

            <span>
              Avg RR
            </span>

          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="login-right">

        <div className="login-box">

          <h2>
            Welcome Back
          </h2>

          <p>
            Access your professional
            trading dashboard
          </p>

          <input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            className="login-main-btn"
            onClick={login}
          >
            Login
          </button>

          <button
            className="register-btn"
            onClick={register}
          >
            Create Account
          </button>

        </div>

      </div>

    </div>
  );
}