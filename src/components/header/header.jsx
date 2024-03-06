import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../logout/logout';
import Switcher from '../switcher/switcher';
import IconSun from '../svg-icon/icon-sun/icon-sun';
import IconMoon from '../svg-icon/icon-moon/icon-moon';
import Search from '../search/search';
import './header.scss';

function Header(props) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('light');

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  const onChangeMode = useCallback((isChecked) => {
    const newMode = isChecked ? 'dark' : 'light';
    setMode(newMode);
    document.body.dataset.theme = newMode;
    localStorage.setItem('theme', newMode);
  }, []);

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
        <Switcher
          checked={mode === 'dark'}
          theme="primary"
          firstOption={<IconSun theme="primary" />}
          secondOption={<IconMoon theme="primary" />}
          onChange={onChangeMode}
          className="header__switcher-mobile"
        />
      </nav>
      <Switcher
        checked={mode === 'dark'}
        theme="secondary"
        firstOption={<IconSun theme="secondary" />}
        secondOption={<IconMoon theme="secondary" />}
        onChange={onChangeMode}
        className="header__switcher-desktop"
      />
    </header>
  );
}

export default Header;
