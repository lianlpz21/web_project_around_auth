import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) {
    return <div>Cargando...</div>;
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <div
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            alt="imagen de perfil"
            className="profile__avatar"
          />
          <button
            className="profile__avatar-edit-btn"
            id="edit-avatar-btn"
            onClick={onEditAvatarClick}
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-btn"
            onClick={onEditProfileClick}
          ></button>
          <p className="profile__occupation">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn" onClick={onAddPlaceClick}></button>
      </section>

      <section className="cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            link={card.link}
            name={card.name}
            likes={card.likes}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>

      <form className="popup popup_type_confirm" id="popup_confirm">
        <div className="popup__content">
          <button
            type="button"
            className="popup__close-button popup__icon"
            id="popup__close-confirm-btn"
          ></button>
          <h3 className="popup__title">¿Estás seguro?</h3>
          <div className="popup__form" name="confirm">
            <button type="submit" className="popup__btn popup__btn-confirm">
              Sí
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
