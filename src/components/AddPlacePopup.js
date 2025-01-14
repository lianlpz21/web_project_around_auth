import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeLink(event) {
    setLink(event.target.value);
  }

  function validateForm() {
    const errors = {};
    if (name.trim() === "") {
      errors.name = "El título es obligatorio.";
    } else if (name.length < 2 || name.length > 30) {
      errors.name = "El título debe tener entre 2 y 30 caracteres.";
    }

    if (link.trim() === "") {
      errors.link = "El enlace a la imagen es obligatorio.";
    } else if (!/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/.test(link)) {
      errors.link =
        "El enlace a la imagen debe ser una URL válida y terminar en .jpg, .jpeg, .png o .gif.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    api
      .addCard({ name, link })
      .then((newCard) => {
        onAddPlace(newCard);
        setName("");
        setLink("");
        onClose();
      })
      .catch((err) => {
        console.error(err);
        // Manejo del error si es necesario
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Agregar carta"
      name="add-place"
      buttonText={isSubmitting ? "Guardando..." : "Guardar"}
      onSubmit={handleSubmit}
    >
      <input
        required
        id="input__title"
        className="popup__input"
        type="text"
        placeholder="Título"
        name="title"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleChangeName}
      />
      <span className="error-message">{errors.name}</span>
      <input
        required
        id="input__url"
        className="popup__input"
        type="url"
        placeholder="Enlace a la imagen"
        name="url"
        value={link}
        onChange={handleChangeLink}
      />
      <span className="error-message">{errors.link}</span>
    </PopupWithForm>
  );
}
