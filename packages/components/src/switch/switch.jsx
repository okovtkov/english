'use client';
import Button from '../button/button';
import './switch.scss';

function Switch(props) {
  return (
    <div className="switch">
      <h1>{props.children}</h1>
      <div className="switch__buttons">
        <Button onClick={props.onSelectFirstValue} className={'switch__button'}>
          {props.firstValue}
        </Button>
        <Button onClick={props.onSelectSecondValue} className={'switch__button'}>
          {props.secondValue}
        </Button>
      </div>
    </div>
  );
}

export default Switch;
