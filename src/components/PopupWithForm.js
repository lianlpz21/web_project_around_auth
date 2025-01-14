import React from "react";

export default function PopupWithForm({
  isOpen,
  onClose,
  title,
  name,
  buttonText,
  onSubmit,
  children,
}) {
  return (
    <form
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      name={name}
      onSubmit={onSubmit}
    >
      <div className="overlay"></div>
      <div className="popup-content">
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button popup__icon"
        ></button>
        <fieldset className="popup__container">
          <h3 className="popup__title">{title}</h3>
          {children}
          <button type="submit" className="popup__btn">
            {buttonText}
          </button>
        </fieldset>
      </div>
    </form>
  );
}
