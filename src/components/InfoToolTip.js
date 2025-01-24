import React from "react";
import succesIcon from "../images/succesIcon.jpg";
import errorIcon from "../images/errorIcon.svg";

function InfoTooltip({ isOpen, success, message, onClose }) {
  return (
    isOpen && (
      <section className="tooltip">
        <div className="tooltip__content">
          <img
            src={success ? succesIcon : errorIcon}
            alt={success ? "Éxito" : "Error"}
            className="tooltip__image"
          />
          <p className="tooltip__paragraph">
            {message ||
              (success
                ? "¡Registro exitoso!"
                : "Algo salió mal, inténtalo de nuevo.")}
          </p>
          <button onClick={onClose} className="tooltip__close"></button>
        </div>
      </section>
    )
  );
}

export default InfoTooltip;
