// src/Home.jsx
import React, { useMemo } from "react";
//import { useNavigate } from "react-router-dom";

// Función para decodificar un JWT sin librerías
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error al decodificar el token:", e);
    return null;
  }
}

function Home() {
  //const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Obtener el nombre desde el token
  const displayName = useMemo(() => {
    if (!token) return "Usuario";

    const payload = parseJwt(token);
    if (!payload) return "Usuario";

    // Intentamos con name, si no existe usamos email o sub
    return payload.name || payload.email || payload.sub || "Usuario";
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    location.href = "/";
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="home-logo">Galaxy App</div>

        <div className="home-user-area">
          <span className="home-username">👋 {displayName}</span>
          <button className="btn-logout" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="home-main">
        <div className="home-card">
          <h1 className="home-title">Bienvenido, {displayName}</h1>
          <p className="home-subtitle">
            Has iniciado sesión correctamente. Desde aquí puedes seguir
            construyendo tu panel, dashboards, menús, etc.
          </p>

          <div className="home-grid">
            <div className="home-widget">
              <h3>Resumen rápido</h3>
              <p>
                Aquí podrías mostrar datos de tu API, estadísticas o accesos
                directos a módulos importantes.
              </p>
            </div>

            <div className="home-widget">
              <h3>Tu perfil</h3>
              <p>
                Nombre desde el token:
                <br />
                <strong>{displayName}</strong>
              </p>
            </div>

            <div className="home-widget">
              <h3>Siguiente paso</h3>
              <p>
                Integra más información protegida con el token, llama a tu API
                usando el <code>access_token</code> y arma tu sistema 😎.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
