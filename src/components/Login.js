import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // Asegúrate de importar correctamente la instancia de api

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .login({ email, password })
      .then(() => {
        // Redirigir a la página principal después de un inicio de sesión exitoso
        navigate("/main");
      })
      .catch((err) => {
        setErrorMessage("Correo electrónico o contraseña incorrectos.");
        console.error("Error en el inicio de sesión:", err);
      });
  };

  return (
    <section className="login">
      <h2 className="login__title">Iniciar Sesión</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          className="login__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="login__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login__submit-btn">
          Iniciar sesión
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </section>
  );
}

export default Login;
