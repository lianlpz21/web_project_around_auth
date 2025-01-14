import logo from "../images/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="logo Around the U.S." className="header__logo" />
      <span className="header__line"></span>
    </header>
  );
}
