'use client';
import './button.scss';

function Button(props) {
  return (
    <button
      className={`button ${props.className} ${props.mode && `button--${props.mode}`}`}
      onClick={props.onClick}
      onSubmit={props.onSubmit}
      type={props.type || 'button'}
    >
      {props.children}
    </button>
  );
}

export default Button;
