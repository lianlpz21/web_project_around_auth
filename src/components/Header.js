import { useLocation } from "react-router-dom";
import logo from "../images/logo.svg";

export default function Header({ userEmail, onLogout, isAuthenticated }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__top">
        <img src={logo} alt="logo Around the U.S." className="header__logo" />

        {location.pathname === "/signin" && (
          <div className="header__auth">
            <a href="/signup" className="header__link">
              Registrarse
            </a>
          </div>
        )}

        {location.pathname === "/signup" && (
          <div className="header__auth">
            <a href="/signin" className="header__link">
              Iniciar Sesión
            </a>
          </div>
        )}

        {isAuthenticated && location.pathname === "/" && (
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
