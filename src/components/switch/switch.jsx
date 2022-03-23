import Button from "../button/button";
import './switch.scss';

function Switch(props) {
  return (
    <div className="switch">
      <h1>Выберите с какого языка хотите переводить</h1>
      <div className="switch__buttons">
        <Button onClick={() => props.onClick('rus')} className={"switch__button"}>С русского</Button>
        <Button onClick={() => props.onClick('eng')} className={"switch__button"}>С английского</Button>
      </div>
    </div>
  );
}

export default Switch;
