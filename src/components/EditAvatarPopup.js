// src/components/EditAvatarPopup.js
import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    // Limpiar el input cuando se abre el popup
    if (isOpen) {
      avatarRef.current.value = "";
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
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
        ref={avatarRef}
        required
      />
      <span className="error-message" id="input__avatar-error"></span>
    </PopupWithForm>
  );
}
