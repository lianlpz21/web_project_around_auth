import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import ImagePopup from "./components/ImagePopup";
import EditProfilePopup from "./components/EditProfilePopup";
import AddPlacePopup from "./components/AddPlacePopup";
import api from "./utils/api";
import CurrentUserContext from "./contexts/CurrentUserContext";
import EditAvatarPopup from "./components/EditAvatarPopup";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para autenticación
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      async function fetchUserInfo() {
        try {
          const userInfo = await api.getUserInfo();
          setCurrentUser(userInfo);
        } catch (error) {
          console.log("Error al obtener la información del usuario", error);
        }
      }
      fetchUserInfo();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      async function fetchCards() {
        try {
          const cardList = await api.getInitialCards();
          setCards(cardList);
        } catch (error) {
          console.log("Error al obtener las tarjetas", error);
        }
      }
      fetchCards();
    }
  }, [isAuthenticated]);

  function handleLoginSuccess() {
    setIsAuthenticated(true);
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCards([]);
  }

  // Manejo de popups y cambios en el perfil y avatar
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfileOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(userData) {
    api
      .setUserInfo(userData)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("Error al actualizar el perfil", error);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar(avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("Error al actualizar el avatar", error);
      });
  }

  function handleAddPlace(newCard) {
    setCards([newCard, ...cards]);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.error(err));
  }

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="App body">
      <div className="page">
        <Header />
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            {/* Ruta para el login */}
            <Route
              path="/signin"
              element={<Login onLoginSuccess={handleLoginSuccess} />}
            />

            {/* Ruta para el registro */}
            <Route path="/signup" element={<Signup />} />

            {/* Ruta principal protegida */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Main
                    onEditProfileClick={handleEditProfileClick}
                    onAddPlaceClick={handleAddPlaceClick}
                    onEditAvatarClick={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onLogout={handleLogout}
                  />
                ) : (
                  <Navigate to="/signin" /> // Redirigir a login si no está autenticado
                )
              }
            />
          </Routes>

          {/* Popups */}
          <EditProfilePopup
            isOpen={isEditProfileOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
      </div>
      <Footer />
    </div>
  );
}

export default App;
