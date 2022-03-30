import { Link } from "react-router-dom";
import './header.scss';

function Header() {
  return(
    <header className="header">
      <Link to={'/'} className="header__link">Главная</Link>
      <Link to={'/edit'} className="header__link">Редактировать</Link>
    </header>
  )
}

export default Header;