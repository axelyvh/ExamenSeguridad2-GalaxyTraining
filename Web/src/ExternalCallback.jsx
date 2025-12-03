// src/ExternalCallback.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ExternalCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");
    //const returnUrl = params.get("returnUrl") || "/";

    if (token) {
      // Guardar token en localStorage
      localStorage.setItem("token", token);

      // Redirigir al home
      setTimeout(() => {
          location.href = "/";
      }, 2000);
    } else {
      // Si no hay token, lo mandamos al login
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      Procesando autenticación...
    </div>
  );
}

export default ExternalCallback;
