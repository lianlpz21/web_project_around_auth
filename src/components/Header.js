import logo from "../images/logo.svg";

export default function Header({ userEmail, onLogout, isAuthenticated }) {
  return (
    <header className="header">
      <img src={logo} alt="logo Around the U.S." className="header__logo" />
      {isAuthenticated && (
        <ul className="header__ul">
          <li className="header__list">
            <h3 className="header__user-email">{userEmail}</h3>
          </li>
          <li className="header__list">
            <button className="header__logout-btn" onClick={onLogout}>
              Cerrar Sesión
            </button>
          </li>
        </ul>
      )}
      <span className="header__line"></span>
    </header>
  );
}
