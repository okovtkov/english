import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../logout/logout";
import Search from "../search/search";
import './header.scss';

function Header(props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [open])

  return(
    <header className="header">
      <button className={classNames("header__burger",
        {"header__burger--active": open}
      )} onClick={() => setOpen(!open)}>
        <span />
        <span />
        <span />
      </button>
      <Search className="header__search" />
      <nav className={classNames("header__container", {
        "header__container--open": open
      })}>
        <h2 className="header__heading">Меню</h2>
        <Link to={'/'} className="header__link" onClick={() => setOpen(false)}>Главная</Link>
        <Link to={'/edit'} className="header__link" onClick={() => setOpen(false)}>Редактировать</Link>
        <Logout
          className="header__logout"
          onChangeAuthorized={props.onChangeAuthorized}
          onChangeUser={props.onChangeUser}
          onChangeChecked={props.onChangeChecked}
        />
      </nav>
    </header>
  )
}

export default Header;