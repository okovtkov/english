import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../popup/popup';
import IconLogout from '../svg-icon/icon-logout';
import './logout.scss';

function Logout(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const onAgree = useCallback(() => {
    props.onChangeUser(null);
    props.onChangeAuthorized(null);
    props.onChangeChecked(false);
    localStorage.removeItem('user');
    navigate('/');
  }, [navigate, props]);

  return (
    <>
      <button onClick={() => setIsPopupOpen(true)} className={`logout ${props.className}`}>
        Выйти
        <IconLogout />
      </button>
      {isPopupOpen && (
        <Popup onAgree={onAgree} onCancel={() => setIsPopupOpen(false)}>
          Вы уверены, что хотите выйти?
        </Popup>
      )}
    </>
  );
}

export default Logout;
