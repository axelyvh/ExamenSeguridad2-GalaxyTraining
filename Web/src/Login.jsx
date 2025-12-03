// src/Login.jsx
import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = "https://localhost:7074/connect/token";

      const body = new URLSearchParams();
      body.append("client_id", "client-01");
      body.append("client_secret", "secret");
      body.append("grant_type", "password");
      body.append("username", email);
      body.append("password", password);
      body.append("scope", "api-01 openid profile email roles");

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      const data = await response.json();
      console.log("Token Response:", data);

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        window.location.href = "/";
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al iniciar sesión");
    }
  };

  const loginGitHub = () => {
    const returnUrl = encodeURIComponent("/");
    window.location.href = `https://localhost:7074/external/login/github?returnUrl=${returnUrl}`;
  };

  const loginGoogle = () => {
    const returnUrl = encodeURIComponent("/");
    window.location.href = `https://localhost:7074/external/login/google?returnUrl=${returnUrl}`;
  };

  const loginMicrosoft = () => {
    const returnUrl = encodeURIComponent("/");
    window.location.href = `https://localhost:7074/external/login/microsoft?returnUrl=${returnUrl}`;
  };

  return (
    <div className="login-page">
      <div className="login-card shadow">
        {/* Panel izquierdo con imagen / branding */}
        <div className="login-hero">
          <div className="login-hero-overlay" />
          <div className="login-hero-content">
            <div className="login-badge">Dashboard</div>
            <h1>Controla todo desde un solo lugar</h1>
            <p>
              Inicia sesión para gestionar tus aplicaciones, usuarios y datos
              de forma segura.
            </p>
          </div>
        </div>

        {/* Panel derecho con formulario */}
        <div className="login-form">
          <div className="login-header">
            <div className="login-logo-circle">A</div>
            <div>
              <h2 className="title">Bienvenido de nuevo</h2>
              <p className="subtitle">
                Ingresa tus credenciales para continuar
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="login-form-inner">
            <div className="mb-3">
              <label className="form-label">Usuario / Correo</label>
              <input
                className="form-control"
                type="text"
                value={email}
                placeholder="ejemplo@correo.com"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                className="form-control"
                type="password"
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Ingresar
            </button>
          </form>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <div className="divider">
            <span>o continúa con</span>
          </div>

          <div className="social-buttons">
            <button className="btn btn-dark" onClick={loginGitHub}>
              <span className="social-icon"></span> GitHub
            </button>

            <button className="btn btn-danger" onClick={loginGoogle}>
              <span className="social-icon">G</span> Google
            </button>
{/* 
            <button className="btn btn-info" onClick={loginMicrosoft}>
              <span className="social-icon"></span> Microsoft
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
