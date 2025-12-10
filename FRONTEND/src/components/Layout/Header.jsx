import logo from "../../images/laptop-code-solid.svg";
import adalabLogo from "../../images/adalab.png";
import "../../styles/Header.scss";
function Header() {
  return (
    <header className="header">
      <a
        className="header__brand"
        href="./"
        title="Haz click para volver a la página inicial"
      >
        <img
          className="header__companyLogo"
          src={logo}
          alt="Logo proyectos molones"
        />
        <h1 className="header__title">Proyectos molones</h1>
      </a>
      <img className="logoSponsor" src={adalabLogo} alt="Logo Adalab" />
    </header>
  );
}

export default Header;
