import { useCallback, useRef } from 'react';
import './switcher.scss';

function Switcher(props) {
  const ref = useRef();

  const onChangeHandler = useCallback(() => {
    const isChecked = ref.current.checked;
    props.onChange(isChecked);
  }, [props]);

  return (
    <label className={`switcher ${props.className} switcher--${props.theme}`}>
      <div className="switcher__icon">{props.firstOption}</div>
      <input
        checked={props.checked}
        ref={ref}
        type="checkbox"
        className="switcher__checkbox"
        onChange={onChangeHandler}
      />
      <div className="switcher__switch" />
      <div className="switcher__icon">{props.secondOption}</div>
    </label>
  );
}

export default Switcher;
