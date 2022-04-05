import { Link } from "react-router-dom";
import Logout from "../logout/logout";
import './header.scss';

function Header(props) {
  return(
    <header className="header">
      <Link to={'/'} className="header__link">Главная</Link>
      <Link to={'/edit'} className="header__link">Редактировать</Link>
      <Logout
        className="header__logout"
        onChangeAuthorised={props.onChangeAuthorised}
        onChangeUser={props.onChangeUser}
      />
    </header>
  )
}

export default Header;