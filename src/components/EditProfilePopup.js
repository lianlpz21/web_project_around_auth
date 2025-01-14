import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name.length < 2 || description.length < 2) {
      return;
    }
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Editar perfil"
      name="edit-profile"
      buttonText="Guardar"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Nombre"
        className="popup__input popup__input_type_name"
        name="name"
        value={name}
        onChange={handleNameChange}
        minLength="2"
        maxLength="40"
        required
      />
      <span className="error-message" id="input__name-error"></span>
      <input
        type="text"
        placeholder="Acerca de mi"
        className="popup__input popup__input_type_description"
        name="description"
        value={description}
        onChange={handleDescriptionChange}
        minLength="2"
        maxLength="200"
        required
      />
      <span className="error-message" id="input__description-error"></span>
    </PopupWithForm>
  );
}
