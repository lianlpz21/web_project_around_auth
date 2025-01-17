import React from "react";

function InfoTooltip({ isOpen, success, onClose }) {
  return (
    isOpen && (
      <section className="tooltip">
        <div className="tooltip__content">
          <p className="tooltip__paragraph">
            {success
              ? "¡Registro exitoso!"
              : "Algo salió mal, inténtalo de nuevo."}
          </p>
          <button onClick={onClose} className="tooltip__close">
            Cerrar
          </button>
        </div>
      </section>
    )
  );
}

export default InfoTooltip;
