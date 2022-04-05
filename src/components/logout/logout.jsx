import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../popup/popup';
import IconLogout from '../svg-icon/icon-logout';
import './logout.scss';

function Logout(props) {
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  const onAgree = useCallback(() => {
    props.onChangeUser(null);
    props.onChangeAuthorised(null);
    localStorage.removeItem('user');
    navigate('/');
  }, [navigate, props]);

  return (
    <>
      <button onClick={() => setPopup(true)} className={`logout ${props.className}`}>
        Выйти
        <IconLogout />
      </button>
      {popup && (
        <Popup onAgree={onAgree} onCancel={() => setPopup(false)}>
          Вы уверены, что хотите выйти?
        </Popup>
      )}
    </>
  );
}

export default Logout;
