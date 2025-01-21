import logo from "../images/logo.svg";

export default function Header({ userEmail, onLogout, isAuthenticated }) {
  return (
    <header className="header">
      <div className="header__top">
        <img src={logo} alt="logo Around the U.S." className="header__logo" />
        {isAuthenticated && (
          <div className="header__user-info">
            <h3 className="header__user-email">{userEmail}</h3>
            <button className="header__logout-btn" onClick={onLogout}>
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
      <span className="header__line"></span>
    </header>
  );
}
