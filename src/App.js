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

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import * as auth from "./utils/auth";
import InfoToolTip from "./components/InfoToolTip";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para autenticación
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  /*LOGIN-REGISTER-LOGOUT*/
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [infoTooltip, setInfoTooltip] = useState({
    isOpen: false,
    success: false,
  });

  const navigate = useNavigate();

  // Comprobar token y autenticar al usuario al cargar
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          setIsAuthenticated(true);
        })
        .catch((err) => {
          setInfoTooltip({ isOpen: true, success: false });
        });
    }
  }, []);

  // Redirigir automáticamente cuando el usuario esté autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Manejar registro
  function handleSignup(email, password) {
    auth
      .signup(email, password)
      .then((data) => {
        setInfoTooltip({
          isOpen: true,
          success: true,
          message: "¡Correcto! Ya estás registrado",
        });

        setTimeout(() => {
          navigate("/signin");
          setInfoTooltip({ isOpen: false });
        }, 2000);
      })
      .catch((err) => {
        console.error("Error durante el registro:", err);
        setInfoTooltip({
          isOpen: true,
          success: false,
          message:
            err.message || "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
        });
      });
  }

  // Manejar inicio de sesión
  function handleLogin(email, password) {
    auth
      .signin(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setUserEmail(email);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.error("Error en el login:", err);
        setInfoTooltip({ isOpen: true, success: false });
      });
  }

  useEffect(() => {
    if (isAuthenticated) {
      async function fetchUserInfo() {
        try {
          const userInfo = await api.getUserInfo();

          setCurrentUser(userInfo);
        } catch (error) {}
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
        } catch (error) {}
      }
      fetchCards();
    }
  }, [isAuthenticated]);

  // Manejar cierre de sesión
  function handleLogout() {
    setIsAuthenticated(false);
    setUserEmail("");
    localStorage.removeItem("jwt");
    navigate("/signin");
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
    api.setUserInfo(userData).then((updatedUser) => {
      setCurrentUser(updatedUser);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar({ avatar }) {
    api.setUserAvatar(avatar).then((updatedUser) => {
      setCurrentUser(updatedUser);
      closeAllPopups();
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
        <Header
          userEmail={userEmail}
          onLogout={handleLogout}
          isAuthenticated={isAuthenticated}
        />
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />

            <Route
              path="/signup"
              element={<Signup onSignup={handleSignup} />}
            />

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
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
          />
        </CurrentUserContext.Provider>

        <Footer />

        <InfoToolTip
          isOpen={infoTooltip.isOpen}
          success={infoTooltip.success}
          onClose={() => setInfoTooltip({ isOpen: false })}
        />
      </div>
    </div>
  );
}

export default App;
