import React from "react";

function InfoTooltip({ isOpen, success, onClose }) {
  return (
    isOpen && (
      <div className="tooltip">
        <div className="tooltip__content">
          <p>
            {success
              ? "¡Registro exitoso!"
              : "Algo salió mal, inténtalo de nuevo."}
          </p>
          <button onClick={onClose} className="tooltip__close">
            Cerrar
          </button>
        </div>
      </div>
    )
  );
}

export default InfoTooltip;
