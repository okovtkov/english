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
        onChangeAuthorized={props.onChangeAuthorized}
        onChangeUser={props.onChangeUser}
        onChangeChecked={props.onChangeChecked}
      />
    </header>
  )
}

export default Header;