import ReactDOM from 'react-dom';
import './modal-window.scss';
import classNames from 'classnames';

function ModalWindow(props) {
  const portal = document.getElementById('portal');

  return ReactDOM.createPortal(
    <dialog
      className={classNames('modal-window', {
        'modal-window--open': props.isOpen,
        [props.className]: props.className,
      })}
      open={props.isOpen}
    >
      <button className="modal-window__close-area" onClick={props.onClose} />
      <div
        className={classNames('modal-window__wrapper', {
          [props.containerClass]: props.containerClass,
        })}
      >
        <button className="modal-window__close-button" onClick={props.onClose} />
        {props.children}
      </div>
    </dialog>,
    portal,
  );
}

export default ModalWindow;
