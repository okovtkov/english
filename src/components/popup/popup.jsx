import './popup.scss';

function Popup(props) {
  return (
    <div className="popup">
      <div className="popup__wrapper">
        <header className="popup__header">Подтвердите действие</header>
        <p className="popup__text">{props.children}</p>
        <footer className="popup__footer">
          <button onClick={props.onAgree} className="popup__ok">Ок</button>
          <button onClick={props.onCancel} className="popup__cancel">Отмена</button>
        </footer>
      </div>
    </div>
  );
}

export default Popup;