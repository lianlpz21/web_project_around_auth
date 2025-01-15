import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .signup({ email, password, name })
      .then(() => {
        navigate("/signin"); // Redirigir al login después de un registro exitoso
      })
      .catch((err) => {
        setErrorMessage(
          "Hubo un error al registrar la cuenta. Inténtalo nuevamente."
        );
        console.error("Error en el registro:", err);
      });
  };

  return (
    <div className="signup">
      <h2>Registrarse</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Registrarse</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>
        ¿Ya tienes una cuenta? <a href="/signin">Inicia sesión</a>
      </p>
    </div>
  );
}

export default Signup;
