// src/components/EditAvatarPopup.js
import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef(); // Usamos useRef para obtener el valor de la entrada

  useEffect(() => {
    // Limpiar el input cuando se abre el popup
    if (isOpen) {
      avatarRef.current.value = "";
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    // Pasamos el valor de la entrada utilizando la ref
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Actualizar avatar"
      name="edit-avatar"
      buttonText="Guardar"
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        placeholder="URL de la nueva imagen"
        className="popup__input popup__input_type_avatar"
        name="avatar"
        ref={avatarRef} // Aquí usamos el ref para acceder al valor
        required
      />
      <span className="error-message" id="input__avatar-error"></span>
    </PopupWithForm>
  );
}
