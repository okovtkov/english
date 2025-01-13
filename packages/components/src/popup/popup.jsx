'use client';
import ReactDOM from 'react-dom';
import './popup.scss';

function Popup(props) {
  const portal = document.getElementById('portal');

  return ReactDOM.createPortal(
    <div className="popup">
      <div className="popup__wrapper">
        <header className="popup__header">Подтвердите действие</header>
        <p className="popup__text">{props.children}</p>
        <footer className="popup__footer">
          <button onClick={props.onAgree} className="popup__ok">
            Ок
          </button>
          <button onClick={props.onCancel} className="popup__cancel">
            Отмена
          </button>
        </footer>
      </div>
    </div>,
    portal
  );
}

export default Popup;
