import { useState } from 'react';
import Popup from '../popup/popup';
import IconLogout from '../svg-icon/icon-logout';
import './logout.scss';

function Logout({ className, onLogout }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsPopupOpen(true)} className={`logout ${className}`}>
        Выйти
        <IconLogout />
      </button>
      {isPopupOpen && (
        <Popup onAgree={onLogout} onCancel={() => setIsPopupOpen(false)}>
          Вы уверены, что хотите выйти?
        </Popup>
      )}
    </>
  );
}

export default Logout;
