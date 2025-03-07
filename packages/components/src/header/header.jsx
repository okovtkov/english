import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import { api } from '@english/api';
import classNames from 'classnames';
import Link from 'next/link';
import Logout from '../logout/logout';
import Search from '../search/search';
import ThemeSwitcher from '../theme-switcher/theme-switcher';
import './header.scss';

function Header({ uid }) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const onLogout = useCallback(() => {
    api.auth.signOut();
    router.push('/auth');
  }, [router]);

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
      <Search className="header__search" uid={uid} />
      <nav
        className={classNames('header__container', {
          'header__container--open': open,
        })}
      >
        <h2 className="header__heading">Меню</h2>
        <Link href="/" className="header__link" onClick={() => setOpen(false)}>
          Главная
        </Link>
        <Link href="/edit" className="header__link" onClick={() => setOpen(false)}>
          Редактировать
        </Link>
        <Logout className="header__logout" onLogout={onLogout} />
        <ThemeSwitcher iconTheme="primary" className="header__switcher-mobile" />
      </nav>
      <ThemeSwitcher iconTheme="secondary" className="header__switcher-desktop" />
    </header>
  );
}

export default Header;
