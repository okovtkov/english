import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../logout/logout';
import Search from '../search/search';
import ThemeSwitcher from '../theme-switcher/theme-switcher';
import './header.scss';

function Header(props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  return (
    <header className="header">
      <button
        className={classNames('header__burger', { 'header__burger--active': open })}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </button>
      <Search className="header__search" data={props.data} />
      <nav
        className={classNames('header__container', {
          'header__container--open': open,
        })}
      >
        <h2 className="header__heading">Меню</h2>
        <Link to={'/'} className="header__link" onClick={() => setOpen(false)}>
          Главная
        </Link>
        <Link to={'/edit'} className="header__link" onClick={() => setOpen(false)}>
          Редактировать
        </Link>
        <Logout
          className="header__logout"
          onChangeAuthorized={props.onChangeAuthorized}
          onChangeUser={props.onChangeUser}
          onChangeChecked={props.onChangeChecked}
        />
        <ThemeSwitcher iconTheme="primary" className="header__switcher-mobile" />
      </nav>
      <ThemeSwitcher iconTheme="secondary" className="header__switcher-desktop" />
    </header>
  );
}

export default Header;
