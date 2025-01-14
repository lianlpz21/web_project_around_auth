export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}>
      <div className="overlay"></div>
      <div className="popup__content">
        <button
          className="popup__close-button popup__icon"
          type="button"
          onClick={onClose}
        ></button>
        {card && (
          <>
            <img className="popup__image" alt={card.name} src={card.link} />
            <p className="popup__caption">{card.name}</p>
          </>
        )}
      </div>
    </div>
  );
}
